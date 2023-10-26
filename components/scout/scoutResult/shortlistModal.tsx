import { Close, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Modal,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  useTheme,
} from "@mui/material";
import {
  MapRegionToSubRegion,
} from "components/geoChart/geoUtils";
import {
  EnumRegion,
  EnumSubRegion,
} from "components/geoChart/types";
import Icon from "components/icon";
import { ResetIconTextButton } from "components/ui-components/iconTextButton";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import { SText } from "components/ui-components/text";
import { useState } from "react";
import styled from "styled-components";

interface IShortListModal {
  open: boolean;
  onClose: (tags?: string[]) => void;
}

enum EnumGeneralFilters {
  GlobalPlayer = "Global Player",
  LocalPlayer = "Local Player",
  Tier1 = "Tier 1 Supplier",
  Tier2 = "Tier 2 Supplier",
  TierN = "Tier N Supplier",
  LowVolumn = "Low Volume Supplier",
  EngServiceProvider = "Engineering Service Provider",
  LowCost = "Low Cost Country Supplier",
}

// enum EnumGlobalFootprintFilters = EnumRegionAndSubRegion;

enum EnumEngineer {
  BuiltToSpec = "Built to Spec",
  BuiltToPrint = "Built to Print",
  CAD = "CAD",
  CAE = "CAE",
  InHouseTestLab = "In-House Test Lab",
  InHouseTooling = "In-House Tooling Shop",
}

enum EnumCertification {
  ISO9001 = "ISO 9001",
  ISOIEC17025 = "ISO/IEC 17025",
  TISAX = "TISAX",
  MMOGLE = "MMOG/LE",
  ASPICE = "ASPICE",
  ISO26262 = "ISO 26262",
  IATF16949 = "IATF 16949",
  ISO14001 = "ISO 14001",
  VDA63 = "VDA 6.3",
  ISO26000 = "ISO 26000",
  ISO50001 = "ISO 50001",
  ISO45001 = "ISO 45001",
}

enum EnumPortfolio {
  European = "European",
  Asian = "Asian",
  American = "American",
  Volume = "Volume",
  Premium = "Premium",
  Luxury = "Luxury",
  Sports = "Sports",
  EVFuelCell = "EV & Fuel Cell",
}

enum EnumPioneer {
  Startup = "Startup",
  Innovation = "Innovation",
  Sustainable = "Sustainable Production",
  DEI = "Diversity, Equity & Inclusion",
  Recycles = "Recycles",
  RisingStars = "Rising Stars",
}

const WhiteBgRoundCornerToggleButton = styled(ToggleButton)`
  && {
    background-color: #ffffff;
    border-radius: 24px;
    border: 1px solid #e5e7eb;
    color: #434343;
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: 400;
  }
  &&.Mui-selected {
    background-color: #e6f5f5;
    border: 1px solid #08979c;
    color: #08979c;
  }
`;

const ShortListModal = ({ open, onClose }: IShortListModal) => {
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const [generalFilter, setGeneralFilter] = useState<EnumGeneralFilters[]>([]);
  const [globalFootprintFilter, setGlobalFootprintFilter] = useState<
    EnumSubRegion[]
  >([]);
  const [engineeringFilter, setEngineeringFilter] = useState<EnumEngineer[]>(
    []
  );
  const [certificationFilter, setCertificationFilter] = useState<
    EnumCertification[]
  >([]);
  const [portfolioFilter, setPortfolioFilter] = useState<EnumPortfolio[]>([]);
  const [pioneerFilter, setPioneerFilter] = useState<EnumPioneer[]>([]);

  const blockDefaultClose = (
    e: React.MouseEvent,
    reason: "escapeKeyDown" | "backdropClick"
  ) => {
    if (reason === "backdropClick") {
      /**
       * Block accidental click
       */
      return;
    }
    // allow close on escape key
    onClose();
  };

  const onSubmit = () => {
    onClose(
      (generalFilter as string[])
        .concat(globalFootprintFilter as string[])
        .concat(engineeringFilter as string[])
        .concat(certificationFilter as string[])
        .concat(portfolioFilter as string[])
        .concat(pioneerFilter as string[])
    );
  };

  const reset = () => {
    setGeneralFilter([]);
    setGlobalFootprintFilter([]);
    setEngineeringFilter([]);
    setCertificationFilter([]);
    setPortfolioFilter([]);
    setPioneerFilter([]);
  };

  const toggle = (filter: string, filterList: string[]) => {
    if (filterList.includes(filter)) {
      return filterList.filter((f) => f !== filter);
    } else {
      return [...filterList, filter];
    }
  };

  const LabelText = ({ children }: { children: React.ReactNode }) => (
    <SText fontSize="12px" color={theme.palette.text.secondary}>
      {children}
    </SText>
  );

  const renderTabFilers = () => {
    const renderGrid = (
      key: string,
      filter: string[],
      set: (nf: any) => void,
      xs: number = 3
    ) => {
      return (
        <Grid key={key} item xs={xs}>
          <WhiteBgRoundCornerToggleButton
            selected={filter.includes(key)}
            value={key}
            fullWidth
            onClick={() => {
              const newGeneralFilter = toggle(key, filter);
              set(newGeneralFilter);
            }}
          >
            {key}
          </WhiteBgRoundCornerToggleButton>
        </Grid>
      );
    };

    if (tab === 0) {
      return (
        <Grid container rowGap={2} spacing={1}>
          {Object.values(EnumGeneralFilters).map((filter) =>
            renderGrid(filter, generalFilter, setGeneralFilter)
          )}
        </Grid>
      );
    }
    if (tab === 1) {
      return (
        <Stack>
          <LabelText>{EnumRegion.Americas}</LabelText>
          <Grid container rowGap={2} spacing={1}>
            {Object.values(MapRegionToSubRegion[EnumRegion.Americas]).map(
              (filter) =>
                renderGrid(
                  filter,
                  globalFootprintFilter,
                  setGlobalFootprintFilter,
                  5
                )
            )}
          </Grid>
          <SpacingVertical space="24px" />
          <LabelText>{EnumRegion.APAC}</LabelText>
          <Grid container rowGap={2} spacing={1}>
            {Object.values(MapRegionToSubRegion[EnumRegion.APAC]).map(
              (filter) =>
                renderGrid(
                  filter,
                  globalFootprintFilter,
                  setGlobalFootprintFilter
                )
            )}
          </Grid>
          <SpacingVertical space="24px" />
          <LabelText>{EnumRegion.EMEA}</LabelText>
          <Grid container rowGap={2} spacing={1}>
            {Object.values(MapRegionToSubRegion[EnumRegion.EMEA]).map(
              (filter) =>
                renderGrid(
                  filter,
                  globalFootprintFilter,
                  setGlobalFootprintFilter
                )
            )}
          </Grid>
        </Stack>
      );
    }
    if (tab === 2) {
      return (
        <Grid container rowGap={2} spacing={1}>
          {Object.values(EnumEngineer).map((filter) =>
            renderGrid(filter, engineeringFilter, setEngineeringFilter)
          )}
        </Grid>
      );
    }
    if (tab === 3) {
      return (
        <Grid container rowGap={2} spacing={1}>
          {Object.values(EnumCertification).map((filter) =>
            renderGrid(filter, certificationFilter, setCertificationFilter, 4)
          )}
        </Grid>
      );
    }
    if (tab === 4) {
      const OEM = [
        EnumPortfolio.European,
        EnumPortfolio.Asian,
        EnumPortfolio.American,
      ];
      const CLASS = [
        EnumPortfolio.Volume,
        EnumPortfolio.Premium,
        EnumPortfolio.Luxury,
        EnumPortfolio.Sports,
        EnumPortfolio.EVFuelCell,
      ];
      return (
        <Stack>
          <LabelText>OEM EXPERIENCE</LabelText>
          <Grid container rowGap={2} spacing={1}>
            {OEM.map((filter) =>
              renderGrid(filter, portfolioFilter, setPortfolioFilter, 3)
            )}
          </Grid>
          <SpacingVertical space="24px" />
          <LabelText>CLASS</LabelText>
          <Grid container rowGap={2} spacing={1}>
            {CLASS.map((filter) =>
              renderGrid(filter, portfolioFilter, setPortfolioFilter, 3)
            )}
          </Grid>
        </Stack>
      );
    }
    if (tab === 5) {
      return (
        <Grid container rowGap={2} spacing={1}>
          {Object.values(EnumPioneer).map((filter) =>
            renderGrid(filter, pioneerFilter, setPioneerFilter, 4)
          )}
        </Grid>
      );
    }
  };

  return (
    <Modal open={open} onClose={blockDefaultClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 3,
          width: "900px",
          borderRadius: "16px",
        }}
      >
        <Stack>
          <Stack
            data-id="shortlist-modal-header"
            direction={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"start"}
          >
            <Stack>
              <SText fontSize="24px" color={theme.palette.primary.main}>
                Build my Shortlist
              </SText>
              <SText
                fontSize="14px"
                fontWeight="400"
                color={theme.palette.text.secondary}
              >
                Efficiently sort results and build you own shortlist
              </SText>
            </Stack>
            <IconButton onClick={() => onClose()}>
              <Close />
            </IconButton>
          </Stack>
        </Stack>
        <SpacingVertical space="24px" />
        <Tabs variant="fullWidth" value={tab} onChange={(e, v) => setTab(v)}>
          <Tab
            sx={{ textTransform: "none" }}
            label="General"
            icon={<Icon src="shortList/general" />}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Global Footprint"
            icon={<Icon src="shortList/globalFootprint" />}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Engineering"
            icon={<Icon src="shortList/engineering" />}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Certification"
            icon={<Icon src="shortList/certification" />}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Portfolio"
            icon={<Icon src="shortList/portfolio" />}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Pioneer"
            icon={<Icon src="shortList/pioneer" />}
          />
        </Tabs>
        <SpacingVertical space="24px" />
        <Box>{renderTabFilers()}</Box>
        <SpacingVertical space="24px" />
        <Divider />
        <SpacingVertical space="24px" />
        <Grid container>
          <Grid item xs={4}>
            <Stack>
              <LabelText>General</LabelText>
              {generalFilter.map((filter) => {
                return <SText key={filter}>{filter}</SText>;
              })}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <LabelText>Global Footprint</LabelText>
              {globalFootprintFilter.map((filter) => {
                return <SText key={filter}>{filter}</SText>;
              })}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <LabelText>Engineering</LabelText>
              {engineeringFilter.map((filter) => {
                return <SText key={filter}>{filter}</SText>;
              })}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <LabelText>Certification</LabelText>
              {certificationFilter.map((filter) => {
                return <SText key={filter}>{filter}</SText>;
              })}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <LabelText>Portfolio</LabelText>
              {portfolioFilter.map((filter) => {
                return <SText key={filter}>{filter}</SText>;
              })}
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <LabelText>Pioneer</LabelText>
              {pioneerFilter.map((filter) => {
                return <SText key={filter}>{filter}</SText>;
              })}
            </Stack>
          </Grid>
        </Grid>
        <SpacingVertical space="24px" />
        <Stack
          data-id="shortlist-modal-footer"
          direction={"row"}
          display={"flex"}
          justifyContent={"end"}
        >
          <ResetIconTextButton onClick={reset} />
          <Button variant="contained" onClick={onSubmit}>
            <Settings
              sx={{
                width: "16px",
                height: "16px",
              }}
            />
            <SpacingHorizontal space="8px" />
            Build NOW
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ShortListModal;
