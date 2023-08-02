import TableFilters, { FilterDataset, FilterValue } from "./tableFilters";
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  styled,
} from "@mui/material";
import { FormatAlignLeft, GridView } from "@mui/icons-material";
import { Trans, useTranslation } from "react-i18next";
import { SText } from "components/ui-components/text";
import { SpacingVertical } from "components/ui-components/spacer";

interface ActionFilterAndViewProps {
  /**
   * Number of results, Use for rendering the string
   * Listing x supplier(s) matching for y
   */
  resultCount: number;
  /**
   * Number of results displayed
   */
  displayCount: number;
  /**
   * To be used in conjunction with resultCount
   */
  resultType: string;
  /**
   * Initial filter data, use for rendering the filter chips
   */
  filterInitialData: FilterDataset;
  view: ViewType;
  onClickBuildMyShortList: () => void;
  onClickBidderList: () => void;
  /**
   * Compare button function, use undefined to disable the button
   * */
  onClickCompare?: () => void;
  onFilterChange: (fv: FilterValue) => void;
  onViewChange: (view: ViewType) => void;
}

export enum ViewType {
  LIST = "list",
  GRID = "grid",
}

const WhiteBgRoundCornerButton = styled(Button)`
  background-color: #ffffff;
  border-radius: 24px;
  border: 1px solid transparent;
  color: #1f2937;
`;

/**
 * Actions == build my shortlist, bidder list, compare suppliers
 *
 * Filters == filter by available filters
 *
 * View == toggle between list and grid view
 */
const ActionFilterAndView = ({
  resultCount,
  displayCount,
  resultType,
  filterInitialData,
  view,
  onClickBuildMyShortList,
  onClickBidderList,
  onClickCompare,
  onFilterChange,
  onViewChange,
}: ActionFilterAndViewProps) => {
  const { t } = useTranslation();
  const hanldeViewChange = (e: any, v: ViewType | null) => {
    if (v === null) {
      // enforce
      return;
    }

    onViewChange(v);
  };
  if (resultCount === 0) {
    return null;
  }
  return (
    <Stack>
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Box>
          <Trans i18nKey="scout.result.overview">
            <SText fontWeight="700" fontSize="32px">
              {{ resultCount } as any}
            </SText>
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
      <SpacingVertical space="24px" />
      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Stack direction={"row"} spacing={2}>
          <WhiteBgRoundCornerButton
            onClick={onClickBuildMyShortList}
            variant="outlined"
          >
            {t("scout.buildMyShortlist", "Build My Shortlist")}
          </WhiteBgRoundCornerButton>
          <WhiteBgRoundCornerButton
            onClick={onClickBidderList}
            variant="outlined"
          >
            {t("scout.bidderList", "Bidder List")}
          </WhiteBgRoundCornerButton>
          <Tooltip title="Select at least 2 suppliers to compare, at most 3">
            <span style={{ display: "flex" }}>
              <WhiteBgRoundCornerButton
                variant="outlined"
                onClick={onClickCompare}
                disabled={onClickCompare === undefined}
              >
                {t("scout.compareSuppliers", "Compare Suppliers")}
              </WhiteBgRoundCornerButton>
            </span>
          </Tooltip>
        </Stack>

        <ToggleButtonGroup exclusive value={view} onChange={hanldeViewChange}>
          <ToggleButton
            sx={{
              borderRadius: "16px",
            }}
            value={ViewType.LIST}
          >
            <FormatAlignLeft />
          </ToggleButton>
          <ToggleButton
            sx={{
              borderRadius: "16px",
            }}
            value={ViewType.GRID}
          >
            <GridView />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <SpacingVertical space="24px" />
    </Stack>
  );
};

export default ActionFilterAndView;
