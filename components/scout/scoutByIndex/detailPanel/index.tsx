import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Tab,
  Tabs,
  styled,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { TSupplierModel } from "models/supplier";
import { toast } from "react-toastify";
import VerifiedSupplierChip from "components/ui-components/verifiedSupplierChip";
import { BadgeType, SupBadge } from "components/ui-components/supBadge";
import { useState } from "react";
import { SText } from "components/ui-components/text";
import RoundImage from "components/ui-components/roundImage";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import General from "./tabPanes/general";
import Portfolio from "./tabPanes/portfolio";
import Innovation from "./tabPanes/innovation";
import Certificaiton from "./tabPanes/certification";
import Ratings from "./tabPanes/ratings";
import SimilarCompanies from "./tabPanes/similiarCompanies";
import { useStore } from "hooks/useStore";
import DetailMapChart from "components/geoChart/detailMapChart";
import { useTranslation } from "react-i18next";

interface IDetailPanelProps {
  open: boolean;
  supplierId?: number;
  stackCount: number;
  onClose: () => void;
  onPushMoreDetails: (supplierId: number) => void;
  onPopMoreDetails: () => void;
}

/**
 * Supplier detail panel
 *
 * fetches data from the store
 *
 */
const DeatilsPanel = ({
  open,
  supplierId,
  stackCount,
  onClose,
  onPushMoreDetails,
  onPopMoreDetails,
}: IDetailPanelProps) => {
  const { t } = useTranslation();
  // const MAP_STYLES_ON_1440 = {
  //   width: 517,
  //   height: 254
  // }
  const DIMENSIONS = {
    width: (window.innerWidth / 1440) * 517,
    height: (window.innerHeight / 900) * 254,
  };
  const { suppliers } = useStore();
  const [tab, setTab] = useState(0);
  if (supplierId === undefined) {
    return null;
  }
  const data: TSupplierModel | undefined = suppliers.find(
    (s) => s.id === supplierId
  );
  if (!data) {
    toast.error("Supplier not found. This is likely a bug. Contact support.");
    return null;
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {/* woulda use 24 * 4 but the tab size is too big, so just doing some random numbers. */}
      <Stack
        p={"24px"}
        bgcolor={"white"}
        minWidth={"680px"}
        width={DIMENSIONS.width + 24 * 6}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <IconButton onClick={onClose}>
            <CancelOutlined sx={{ fontSize: 22 }} />
          </IconButton>
          {/* <Box display={stackCount > 0 ? "block" : "none"}>
            <IconButton onClick={onPopMoreDetails}>
              <KeyboardArrowUp />
            </IconButton>
          </Box> */}
          <Stack direction={"row"}>
            <Button variant="outlined">
              {t("detailPanel.sendNdaRfi", "One Click Send")}
            </Button>
            <SpacingHorizontal space="8px" />
            {/* <Button variant="contained">
              {t("detailPanel.contacMore", "contact more")}
            </Button> */}
          </Stack>
        </Box>
        <Box sx={{ minWidth: DIMENSIONS.width, minHeight: DIMENSIONS.height }}>
          <DetailMapChart
            dimensions={DIMENSIONS}
            locationIds={data.locationId}
          />
        </Box>
        <SpacingVertical space="24px" />
        <Stack direction={"row"} alignItems={"center"}>
          <RoundImage src={data.logo} size={52} />
          <SpacingHorizontal space="8px" />
          <SText fontSize="24px">{data.name}</SText>
          <SpacingHorizontal space="8px" />
          <VerifiedSupplierChip />
          <SpacingHorizontal space="8px" />
          <SupBadge badge={BadgeType.major} />
        </Stack>
        <SpacingVertical space="24px" />
        <StyledTabs
          value={tab}
          onChange={(e, v: number) => {
            setTab(v);
          }}
        >
          <Tab label={t("detailPanel.General", "General")} value={0} />
          <Tab label={t("detailPanel.Portfolio", "Portfolio")} value={1} />
          <Tab label={t("detailPanel.Innovations", "Innovations")} value={2} />
          <Tab
            label={t("detailPanel.Certifications", "Certifications")}
            value={3}
          />
          <Tab label={t("detailPanel.Ratings", "Ratings")} value={4} />
          <Tab
            label={t("detailPanel.SimilarCompanies", "SimilarCompanies")}
            value={5}
          />
        </StyledTabs>
        <SpacingVertical space="24px" />
        {tab === 0 && <General data={data} />}
        {tab === 1 && <Portfolio data={data} />}
        {tab === 2 && <Innovation data={data} />}
        {tab === 3 && <Certificaiton data={data} />}
        {tab === 4 && <Ratings data={data} />}
        {tab === 5 && (
          <SimilarCompanies
            data={data}
            onClickSimilarCompany={onPushMoreDetails}
          />
        )}
      </Stack>
    </Drawer>
  );
};

/**
 * A custom tab, with border all around,
 * and first + last tab with rounded corners
 * selected tab background color = E5E7EB, text color = 434343
 * unselected tab background color = white, text color = 9CA3AF
 * */
const StyledTabs = styled(Tabs)(({ theme }) => ({
  margin: "auto",
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .MuiTab-root": {
    border: "1px solid #E5E7EB",

    color: "#9CA3AF",
    fontFamily: "Ubuntu",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 400,
    height: "32px",
    minHeight: "16px",
    padding: "8px",
    margin: "0",

    opacity: 1,
    "&.Mui-selected": {
      backgroundColor: "#E5E7EB",
      color: "#434343",
    },

    "&:first-child": {
      marginLeft: 0,
      borderTopLeftRadius: "24px",
      borderBottomLeftRadius: "24px",
    },
    "&:last-child": {
      marginRight: 0,
      borderTopRightRadius: "24px",
      borderBottomRightRadius: "24px",
    },
  },
}));

export default DeatilsPanel;
