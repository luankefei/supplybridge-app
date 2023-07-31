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
  GridRowClassNameParams,
  GridRowSelectionModel,
  GridRowSpacingParams,
  gridClasses,
} from "@mui/x-data-grid";
import { ChevronRight, DensitySmall, Info } from "@mui/icons-material";
import { ITableData } from "./helper";
import { SText } from "components/ui-components/text";
import DeatilsPanel from "../detailPanel";
import { BadgeType, SupBadge } from "components/ui-components/supBadge";
import { ViewType } from "../actionFilterAndView";
import ScoutResultCardView from "./cardView";
import { EnumSearchType } from "../searchBar";

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

interface IScoutResultTableProps {
  viewType: ViewType;
  searchType: EnumSearchType;
  tableData?: ITableData[];
  selectedRows: number[];
  onRowSelect: (selectedRows: number[]) => void;
  onShowSimilarCompanies?: (similarCompanyName: string) => void;
}

/**
 * Only for rendering the table of results from the scout page.
 * -- this component does not control its own state,
 * -- except for 1 local state for the drawer stack
 * requries the following props:
 * @props
 * -- viewType: ViewType (GRID (for card view) or LIST (fro table view))
 *
 * -- searchType: EnumSearchType (Keywords or Companies), use this to alternatively show "similar companies" button
 *
 * -- tableData: ITableData[] (the data to be rendered in the table)
 *
 * -- selectedRows: number[] (the list of selected rows)
 *
 * -- onRowSelect: (selectedRows: number[]) => void (callback to parent component when a row is selected)
 *
 * -- onShowSimilarCompanies?: (similarCompanyName: string) => void (callback to parent component when "similar companies" button is clicked)
 */
export default function ScoutResultTable({
  viewType,
  searchType,
  tableData,
  selectedRows,
  onRowSelect,
  onShowSimilarCompanies,
}: IScoutResultTableProps) {
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

  const columns: GridColDef<ITableData>[] = [
    // { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Organization",
      width: 300,
      sortable: false,
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
      sortable: false,
      width: 200,
      flex: 1,
      renderCell: (params) => {
        const { headquarter, hqCode } = params.row;
        if (!headquarter) {
          return null;
        }
        return (
          <Box sx={{ display: "flex" }} alignItems={"center"}>
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
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        const { globalFootprintRegion } = params.row;
        if (!globalFootprintRegion) {
          return null;
        }
        const arrayValue = Array.from(globalFootprintRegion.values());
        // console.log(arrayValue);
        return (
          <Box sx={{ display: "flex" }} alignItems={"center"}>
            {arrayValue.map((subRegion: string, i: number) => {
              return (
                <SText key={i} fontSize="16px" fontWeight="normal">
                  {subRegion}
                  {i !== arrayValue.length - 1 ? "," : null}
                  {i !== arrayValue.length - 1 ? <span>&nbsp;</span> : null}
                </SText>
              );
            })}
          </Box>
        );
      },
    },
    {
      field: "badges",
      headerName: "Badge",
      sortable: false,
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
        if (searchType === EnumSearchType.Companies) {
          return (
            <Tooltip title="show similar companies">
              <IconButton
                onClick={() => {
                  if (onShowSimilarCompanies && params.row.category?.[0]) {
                    onShowSimilarCompanies(params.row.category?.[0]);
                  }
                }}
              >
                <ChevronRight />
              </IconButton>
            </Tooltip>
          );
        }

        // Disable showMoreDeatils temporarily
        // return (
        //   <Tooltip title="show more details">
        //     <IconButton
        //       onClick={() => {
        //         pushDrawer(params.row.id);
        //       }}
        //     >
        //       <DensitySmall />
        //     </IconButton>
        //   </Tooltip>
        // );
      },
    },
  ];

  const getRowSpacing = useCallback((params: GridRowSpacingParams) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const getRowClassName = useCallback((params: GridRowClassNameParams) => {
    const { name } = params.row;

    return name === undefined ? "emptyRow" : "";
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
          [`& .emptyRow`]: {
            backdropFilter: "blur(4px)",
            opacity: 0.5,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            cursor: "not-allowed",
            ":after": {
              content: '"LOCKED"',
              color: "#000",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            },
            ":hover": {
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            },
          },
        }}
        rows={tableData}
        disableColumnMenu
        getRowSpacing={getRowSpacing}
        isRowSelectable={(params) => params.row.name !== undefined}
        getRowClassName={getRowClassName}
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
