import * as React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import Icon from "components/Icon";
import useStore from "hooks/useStore";
import { NullableImg } from "components/scout/Summary.styled";
import { Box, IconButton, Tooltip } from "@mui/material";
import { SpacingVertical } from "components/ui-components/spacer";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  AlignHorizontalCenter,
  AlignVerticalCenter,
  DensitySmall,
  Info,
} from "@mui/icons-material";
import { BadgeType, ITableData, supplierModelToTableData } from "./helper";
import { log } from "console";

const regionMap: any = {
  "1": "APAC",
  "2": "AMERICAS",
  "3": "EMEA",
};

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
  padding: 2px 5px;
  &.top {
    background-color: #fae3de;
    color: #551c18;
  }
  &.maj {
    background-color: #deecdc;
    color: #23372a;
  }
  &.str {
    background-color: #d6e4ee;
    color: #1f3245;
  }
`;
export default function ScoutResultTable() {
  const { t } = useTranslation();
  const { allSubRegions, suppliers } = useStore();

  const data: ITableData[] = suppliers?.map((s: any, i: number) =>
    supplierModelToTableData(s, i, allSubRegions)
  );

  const handleRowSelection = (rowSelectionModel: any, details: any) => {
    // console.log("rowSelectionModel", rowSelectionModel);
    // console.log("details", details);
    /**
     * rowSelectionModel = index of selected rows as a list
     * details: {
     *  reason: undefined
     * }
     */
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Organization",
      width: 340,
      renderCell: (params) => {
        // render logo with name
        const { logo, name, isInnovation } = params.row;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <NullableImg url={logo} />
            <div style={{ marginLeft: 8 }}>{name}</div>
            {isInnovation && <Icon src="innovation" width={20} height={20} />}
          </div>
        );
      },
    },
    {
      field: "headquarter",
      headerName: "HQ location",
      width: 165,
    },
    {
      field: "location",
      headerName: "Location",
      width: 165,
    },
    {
      field: "badge",
      headerName: "Badge",
      width: 200,
      renderHeader: () => {
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginLeft: 8 }}>Badge</div>
            <Tooltip title={supBadgeTooltipText}>
              <Info />
            </Tooltip>
          </div>
        );
      },
      renderCell: (params) => {
        const { badge } = params.row;
        if (!badge) {
          return null;
        }
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {badge[BadgeType.major] ? (
              <SupBadge className={"maj"}>MAJOR</SupBadge>
            ) : null}
            {badge[BadgeType.top] ? (
              <SupBadge className={"top"}>TOP</SupBadge>
            ) : null}
            {badge[BadgeType.risingStar] ? (
              <SupBadge className={"str"}>RISING STAR</SupBadge>
            ) : null}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Show similiar",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              console.log("sup");
            }}
          >
            <DensitySmall />
          </IconButton>
        );
      },
    },
  ];

  if (!data || data.length == 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", height: "50vh", p: 3 }}>
      <DataGrid
        sx={{ backgroundColor: "#fff" }}
        rows={data}
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
