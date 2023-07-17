import * as React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import Icon from "components/Icon";
import useStore from "hooks/useStore";
import { NullableImg } from "components/scout/Summary.styled";
import {
  Box,
  Table,
  TableContainer,
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import ScoutResultTableHead from "./tableHead";
import { SpacingVertical } from "components/ui-components/spacer";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

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

export default function ScoutResultTable() {
  const { t } = useTranslation();
  const { allSubRegions, suppliers, flags, setFilterData } = useStore();

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ITableData>();
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  const handleRequestSort = (property: keyof ITableData) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const data: ITableData[] = suppliers?.map((x: any, idx: any) => ({
    id: x.id || idx,
    logo: x.logo || `https://cdn-stage.supplybridge.com/images/logos/no.png`,
    name: x.name && x.name.toUpperCase(),
    longName: x.longName,
    headquarter: x.headquarterId
      ? allSubRegions.find((z: any) => z.id === x.headquarterId)
      : null,
    isInnovation: x.isInnovation,
    isBlur: !x.headquarterId,
    category: x?.category || [],
    flags: x?.flags || {},
    meta: {
      hqlocation: x.headquarter
        ? (x.headquarter.code || x.headquarter.name).toLowerCase()
        : "",
    },
  }));

  const onResultClick = (row: any) => {
    const q = row.category?.[0];
    if (!q) return;
    flags.selected = row;
    flags.back = flags.q;
    setFilterData({ q: q.split(",")[0] });
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Organization",
      resizable: true,
      renderCell: (params) => {
        // render logo with name
        const { logo, name } = params.row;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <NullableImg url={logo} />
            <div style={{ marginLeft: 8 }}>{name}</div>
          </div>
        );
      },
    },
    { field: "longName", headerName: "Full Name" },
    {
      field: "headquarterId",
      headerName: "HQ location",
      renderCell: (params) => {
        const { headquarter, meta } = params.row;
        return (
          <>
            <NullableImg
              url={
                headquarter?.code
                  ? `/flags/${headquarter?.code?.toLowerCase()}.svg`
                  : ""
              }
            />
            <div>
              {t(`subregion.${meta.hqlocation}`, `hidden.${meta.hqlocation}`)}
            </div>
          </>
        );
      },
    },
    {
      field: "footprint",
      headerName: "Global footprint",
      width: 160,
    },
    {
      field: "isInnovation",
      headerName: "Badge",
      valueGetter: (params: GridValueGetterParams) => {
        const { isInnovation } = params.row;
        if (isInnovation) {
          return <Box sx={{ display: "flex", alignItems: "center" }}></Box>;
        }
        return null;
      },
    },
  ];

  if (!data || data.length == 0) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <DataGrid
        sx={{ backgroundColor: "#fff" }}
        rows={data}
        columns={columns}
        checkboxSelection
      />
      <SpacingVertical space="50px" />
    </Box>
  );
}
