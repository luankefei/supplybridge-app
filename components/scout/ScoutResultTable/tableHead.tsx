import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
} from "@mui/material";
import { SText } from "components/ui-components/text";

const headCells: readonly ITableHeadCell[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Organization",
    sortable: true,
  },
  {
    id: "logo",
    label: "Logo",
  },
  {
    id: "headquarter",
    numeric: true,
    disablePadding: false,
    label: "HQ Location",
    sortable: true,
  },
  {
    id: "footprint",
    numeric: true,
    disablePadding: false,
    label: "Global Footprint",
    sortable: true,
  },
  {
    id: "isInnovation",
    numeric: true,
    disablePadding: false,
    label: "Badge",
  },
];

interface Props {
  order?: Order;
  orderBy?: string;
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRequestSort: (property: keyof ITableData) => void;
}

/**
 * Renders the table head for the scout result table.
 *
 * @param {Object} props - The component props.
 * @param {Order} props.order - The current sort order.
 * @param {string} props.orderBy - The current sort column.
 * @param {number} props.numSelected - The number of selected rows.
 * @param {number} props.rowCount - The total number of rows.
 * @param {Function} props.onSelectAllClick - The function to handle selecting all rows.
 * @param {Function} props.onRequestSort - The function to handle sorting the table.
 * @returns {JSX.Element} - The table head component.
 */
const ScoutResultTableHead = ({
  order,
  orderBy,
  numSelected,
  rowCount,
  onSelectAllClick,
  onRequestSort,
}: Props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all rows",
            }}
          />
        </TableCell>
        <TableCell padding="checkbox">
          <SText>Count</SText>
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => onRequestSort(headCell.id)}
              >
                <SText>{headCell.label}</SText>
              </TableSortLabel>
            ) : (
              <SText>{headCell.label}</SText>
            )}
          </TableCell>
        ))}
        <TableCell>
          <SText>Show Similar</SText>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ScoutResultTableHead;
