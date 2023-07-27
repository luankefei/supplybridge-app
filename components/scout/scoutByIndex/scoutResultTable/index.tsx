import React, { useCallback, useState } from "react";
import Icon from "components/icon";
import { NullableImg } from "components/scout/scoutByIndex/summary.styled";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridRowSpacingParams,
  gridClasses,
} from "@mui/x-data-grid";
import { DensitySmall, Info } from "@mui/icons-material";
import { ITableData } from "./helper";
import { SText } from "components/ui-components/text";
import DeatilsPanel from "../detailPanel";
import { BadgeType, SupBadge } from "components/ui-components/supBadge";
import { ViewType } from "../actionFilterAndView";
import ScoutResultCardView from "./cardView";

const supBadgeTooltipText = (
  <div>
    <div>
      <h3>Top</h3>
    </div>
    <p>
      A few lead performingSuppliers in the particular category / sub-category
      -usually by Sales Marketshare.
    </p>
    <div>
      <h3>MAJOR</h3>
    </div>
    <p>
      Key Suppliers in the particular category / sub-category - can be by a
      combination of criteria.
    </p>
    <div>
      <h3>RISING STAR</h3>
    </div>
    <p>
      High potential suppliers with promising new technology, business model.or
      other forms of innovations.
    </p>
  </div>
);

interface IScoutResultTable {
  viewType: ViewType;
  tableData?: ITableData[];
  selectedRows: number[];
  onRowSelect: (selectedRows: number[]) => void;
}

export default function ScoutResultTable({
  viewType,
  tableData,
  selectedRows,
  onRowSelect,
}: IScoutResultTable) {
  const [drawerStack, setDrawerStack] = useState<JSX.Element[]>([]);
  const pushDrawer = (sid: number) => {
    const newDrawerContent = (
      <DeatilsPanel
        open={true}
        supplierId={sid}
        stackCount={drawerStack.length + 1}
        onPushMoreDetails={pushDrawer}
        onPopMoreDetails={popDrawer}
        onClose={clearDrawerStack}
      />
    );
    setDrawerStack((prevStack) => [...prevStack, newDrawerContent]);
  };
  const popDrawer = () => {
    setDrawerStack((prevStack) => {
      const newStack = [...prevStack];
      newStack.pop();
      return newStack;
    });
  };
  const clearDrawerStack = () => {
    setDrawerStack([]);
  };

  const theme = useTheme();

  const handleRowSelection = (
    rowSelectionModel: GridRowSelectionModel,
    details: any
  ) => {
    /**
     * rowSelectionModel = GridRowId (string | number ) of selected rows as a list
     * details: {
     *  reason: undefined
     * }
     */
    if (onRowSelect) {
      onRowSelect(rowSelectionModel as number[]);
    }
  };

  const columns: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Organization",
      width: 300,
      renderCell: (params) => {
        // render logo with name
        const { logo, name, isInnovation } = params.row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NullableImg url={logo} />
            <SpacingHorizontal space="8px" />
            <SText fontSize="16px" fontWeight="normal">
              {name}
            </SText>
            <SpacingHorizontal space="8px" />
            {isInnovation && <Icon src="innovations" width={20} height={20} />}
          </Box>
        );
      },
    },
    {
      field: "headquarter",
      headerName: "HQ location",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        const { headquarter, hqCode } = params.row;
        return (
          <Box sx={{ display: "flex" }}>
            <NullableImg
              url={hqCode ? `/flags/${hqCode?.toLowerCase()}.svg` : ""}
            />
            <SpacingHorizontal space="8px" />
            <SText fontSize="16px" fontWeight="normal">
              {headquarter}
            </SText>
          </Box>
        );
      },
    },
    {
      field: "globalFootprint",
      headerName: "Global footprint",
      minWidth: 160,
      flex: 1,
    },
    {
      field: "badges",
      headerName: "Badge",
      width: 200,
      renderHeader: () => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={supBadgeTooltipText}>
              <Info
                sx={{ width: "16px", color: theme.palette.text.secondary }}
              />
            </Tooltip>
            <span style={{ marginLeft: 8 }}>Badge</span>
          </div>
        );
      },
      renderCell: (params) => {
        const badges: BadgeType[] = params.row.badges;
        if (!badges) {
          return null;
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {badges.map((badge: BadgeType, i: number) => (
              <SupBadge key={i} badge={badge} />
            ))}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Tooltip title="show more details">
            <IconButton
              onClick={() => {
                pushDrawer(params.row.id);
              }}
            >
              <DensitySmall />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  if (!tableData || tableData.length == 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {drawerStack.length > 0 && drawerStack[drawerStack.length - 1]}
      <DataGrid
        sx={{
          display: viewType === ViewType.GRID ? "none" : "block",
          border: "none",
          [`& .${gridClasses.withBorderColor}`]: {
            border: "none",
          },
          [`& .${gridClasses.row}`]: {
            bgcolor: "#fff",
            borderRadius: "16px",
          },
          [`& .${gridClasses.cell}`]: {
            border: "none",
          },
        }}
        rows={tableData}
        getRowSpacing={getRowSpacing}
        rowSpacingType="margin"
        columns={columns}
        disableRowSelectionOnClick
        disableColumnSelector
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleRowSelection}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
      />
      <ScoutResultCardView
        sx={{
          display: viewType === ViewType.GRID ? "block" : "none",
        }}
        rows={tableData}
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        pushDrawer={pushDrawer}
      />
      <SpacingVertical space="50px" />
    </Box>
  );
}
