import TableFilters, { FilterDataset, FilterValue } from "./tableFilters";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  styled,
} from "@mui/material";
import {
  FormatAlignLeft,
  GridView,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { Trans, useTranslation } from "react-i18next";
import { SText } from "components/ui-components/text";
import { SpacingVertical } from "components/ui-components/spacer";
import { useState } from "react";

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
  onClickSendNDA?: () => void;
  onClickSendRFI?: () => void;
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
  onClickSendNDA,
  onClickSendRFI,
  onFilterChange,
  onViewChange,
}: ActionFilterAndViewProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (open) {
      handleClose();
      return;
    }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type?: "NDA" | "RFI") => {
    setAnchorEl(null);
    type === "NDA" ? onClickSendNDA?.() : onClickSendRFI?.();
  };

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
      <Grid container justifyContent={"space-between"} rowGap={2}>
        <Grid item>
          <Trans
            i18nKey="scout.result.overview"
            components={{
              bold: <SText fontWeight="700" fontSize="32px" />,
            }}
            values={{
              displayCount: displayCount.toLocaleString(),
              resultCount: resultCount.toLocaleString(),
              resultType: resultType.toUpperCase(),
            }}
          />
        </Grid>
        <Grid item>
          <TableFilters
            initialValue={filterInitialData}
            onFilterChange={onFilterChange}
          />
        </Grid>
      </Grid>
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
          <WhiteBgRoundCornerButton
            variant="outlined"
            disabled={
              onClickSendNDA === undefined || onClickSendRFI === undefined
            }
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
          >
            {t("scout.result.oneClickSend", "1-Click Send")}
          </WhiteBgRoundCornerButton>
          <Menu
            PaperProps={{
              style: {
                borderRadius: "16px",
                width: "200px",
                marginTop: "8px",
              },
            }}
            open={open}
            anchorEl={anchorEl}
            onClose={() => handleClose()}
          >
            <MenuItem onClick={() => handleClose("NDA")}>
              {t("scout.result.oneClickSendOption1", "Send NDA")}
            </MenuItem>
            <MenuItem onClick={() => handleClose("RFI")}>
              {t("scout.result.oneClickSendOption2", "Send RFI Doc")}
            </MenuItem>
          </Menu>
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
