import * as React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import Icon from "components/Icon";
import useStore from "hooks/useStore";
import { NullableImg } from "components/scout/Summary.styled";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DensitySmall, GridView, Info, List } from "@mui/icons-material";
import {
  BadgeType,
  ITableData,
  mapBadgeTypeToString,
  supplierModelToTableData,
} from "./helper";
import { SText } from "components/ui-components/text";
import TableFilters, { FilterValue } from "./tableFilters";
import { hasIntersection } from "utils/array";
import { useEffect } from "react";

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

const SupBadge = styled("span")`
  display: inline-block;
  border-radius: 4px;
  padding: 2px 5px;
  &.top {
    background-color: #fae3de;
    color: #551c18;
  }
  &.major {
    background-color: #deecdc;
    color: #23372a;
  }
  &.risingStar {
    background-color: #d6e4ee;
    color: #1f3245;
  }
`;
export default function ScoutResultTable() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { allSubRegions, suppliers } = useStore();
  const [data, setData] = React.useState<ITableData[]>([]);
  const [tableData, setTableData] = React.useState<ITableData[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  useEffect(() => {
    const initialData = suppliers?.map((s: any, i: number) =>
      supplierModelToTableData(s, i, allSubRegions)
    );
    setData(initialData);
    setTableData(initialData);
  }, [suppliers, allSubRegions]);

  const handleRowSelection = (rowSelectionModel: any, details: any) => {
    // console.log("rowSelectionModel", rowSelectionModel);
    // console.log("details", details);
    /**
     * rowSelectionModel = index of selected rows as a list
     * details: {
     *  reason: undefined
     * }
     */
    setSelectedRows(rowSelectionModel);
  };

  const onFilterChange = (fv: FilterValue) => {
    const newData = data.filter((d) => {
      const { name, headquarter, globalFootprint, badges } = d;
      const { names, headquarters, globalFootprints, badges: fvBadges } = fv;
      return (
        (names.length === 0 || names.includes(name)) &&
        (headquarters.length === 0 || headquarters.includes(headquarter)) &&
        (globalFootprints.length === 0 ||
          hasIntersection(globalFootprint, globalFootprints)) &&
        (fvBadges.length === 0 || fvBadges.some((fvb) => badges.includes(fvb)))
      );
    });
    setTableData(newData);
  };

  const compareSuppliers = () => {
    console.log("selectedRows", selectedRows);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
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
              <SupBadge key={i} className={badge}>
                {mapBadgeTypeToString(badge)}
              </SupBadge>
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
                console.log(params);
              }}
            >
              <DensitySmall />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  if (!data || data.length == 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Stack
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Stack direction={"row"} spacing={2}>
            <Button variant="outlined">Build my shortlist</Button>
            <Button variant="outlined">Bidder List</Button>
            <Tooltip title="Select at least 2 suppliers to compare">
              <span style={{ display: "flex" }}>
                <Button
                  variant="outlined"
                  onClick={compareSuppliers}
                  disabled={selectedRows.length < 2}
                >
                  Compare Suppliers
                </Button>
              </span>
            </Tooltip>
          </Stack>
          <TableFilters data={data} onFilterChange={onFilterChange} />
        </Box>
        <SpacingVertical space="20px" />
        <Box sx={{ justifyContent: "end", display: "flex" }}>
          <IconButton>
            <List />
          </IconButton>
          <IconButton>
            <GridView />
          </IconButton>
        </Box>
      </Stack>
      <DataGrid
        sx={{ backgroundColor: "#fff" }}
        rows={tableData}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnSelector
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
      <SpacingVertical space="50px" />
    </Box>
  );
}
