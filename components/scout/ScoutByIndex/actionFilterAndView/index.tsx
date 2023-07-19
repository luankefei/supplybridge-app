import TableFilters, { FilterDataset, FilterValue } from "./tableFilters";
import { Box, Button, IconButton, List, Stack, Tooltip } from "@mui/material";
import { GridView } from "@mui/icons-material";
import { Trans } from "react-i18next";
import { SText } from "components/ui-components/text";

interface ActionFilterAndViewProps {
  resultCount: number;
  resultType: string;
  filterInitialData: FilterDataset;
  onClickBuildMyShortList: () => void;
  onClickBidderList: () => void;
  // use undefined to disable the button
  onClickCompare?: () => void;
  onFilterChange: (fv: FilterValue) => void;
  onViewChange: (view: ViewType) => void;
}

export enum ViewType {
  LIST = "list",
  GRID = "grid",
}

const ActionFilterAndView = ({
  resultCount,
  resultType,
  filterInitialData,
  onClickBuildMyShortList,
  onClickBidderList,
  onClickCompare,
  onFilterChange,
  onViewChange,
}: ActionFilterAndViewProps) => {
  if (resultCount === 0) {
    return null;
  }
  return (
    <Stack>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Box>
          <Trans i18nKey="scout.result.overview" count={resultCount}>
            Listing
            <SText fontWeight="700" fontSize="32px">
              {{ resultCount } as any}
            </SText>
            supplier(s) matching for
            <SText fontWeight="700" fontSize="32px">
              {{ resultType } as any}
            </SText>
          </Trans>
        </Box>
        <TableFilters
          initialValue={filterInitialData}
          onFilterChange={onFilterChange}
        />
      </Stack>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Stack direction={"row"} spacing={2}>
          <Button onClick={onClickBuildMyShortList} variant="outlined">
            Build my shortlist
          </Button>
          <Button onClick={onClickBidderList} variant="outlined">
            Bidder List
          </Button>
          <Tooltip title="Select at least 2 suppliers to compare">
            <span style={{ display: "flex" }}>
              <Button
                variant="outlined"
                onClick={onClickCompare}
                disabled={onClickCompare === undefined}
              >
                Compare Suppliers
              </Button>
            </span>
          </Tooltip>
        </Stack>

        <Box sx={{ justifyContent: "end", display: "flex" }}>
          <IconButton onClick={() => onViewChange(ViewType.LIST)}>
            <List />
          </IconButton>
          <IconButton onClick={() => onViewChange(ViewType.GRID)}>
            <GridView />
          </IconButton>
        </Box>
      </Stack>
    </Stack>
  );
};

export default ActionFilterAndView;
