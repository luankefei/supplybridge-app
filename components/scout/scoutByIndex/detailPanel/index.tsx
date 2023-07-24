import { Box, Drawer, IconButton, Stack, Tab, Tabs } from "@mui/material";
import { ChevronRight, Close, KeyboardArrowUp } from "@mui/icons-material";
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
      <Stack p={"24px 48px"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <Box display={stackCount > 0 ? "block" : "none"}>
            <IconButton onClick={onPopMoreDetails}>
              <KeyboardArrowUp />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ width: "557px", height: "174px" }}>MAP place holder</Box>
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
        <Tabs
          value={tab}
          onChange={(e, v: number) => {
            setTab(v);
          }}
        >
          <Tab label="General" value={0} />
          <Tab label="Portfolio" value={1} />
          <Tab label="Innovations" value={2} />
          <Tab label="Certifications" value={3} />
          <Tab label="Ratings" value={4} />
          <Tab label="Similar Companies" value={5} />
        </Tabs>
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

export default DeatilsPanel;
