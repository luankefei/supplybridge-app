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

  const data: ITableData[] = suppliers?.map((x: any) => ({
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
  if (!data || data.length == 0) {
    return null;
  }
  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <TableContainer>
        <Table stickyHeader>
          <ScoutResultTableHead
            order={order}
            orderBy={orderBy}
            numSelected={selected.length}
            rowCount={data.length}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={(property) => {
              handleRequestSort(property);
            }}
          />
          <TableBody>
            {data.map((row, index) => {
              const isItemSelected = selected.indexOf(row.name) !== -1;
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.name)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isItemSelected}
                  sx={{ cursor: "pointer", backgroundColor: "#fff" }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {index + 1}
                  </TableCell>

                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                  >
                    {row.longName}
                  </TableCell>
                  <TableCell>
                    <NullableImg src={row.logo} alt={row.name} width="50px" />
                  </TableCell>
                  <TableCell>{row.headquarter}</TableCell>
                  <TableCell>{row.footprint}</TableCell>
                  <TableCell>{row.isInnovation}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SpacingVertical space="50px" />
    </Box>
  );
}
