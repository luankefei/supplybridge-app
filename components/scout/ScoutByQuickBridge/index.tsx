import { useEffect, useRef, useState } from "react";
import { keyframes, styled, useTheme } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ByVehicle from "./ByVehicle";
import ByOEM from "./ByOEM";
import ByClass from "./ByClass";
import ByTechnology from "./ByTechnology";
import ByProductionTech from "./ByProductionTech";
import Icon from "components/Icon";
import ByPioneer from "./ByPioneer";
import BySegment from "./BySegment";
import dynamic from "next/dynamic";
import ByCommodity from "./ByCommodity";
import QuickbridgeResult from "./Result";

const Feedback = dynamic(() => import("components/Feedback"));

import useBoundStore from "hooks/useBoundStore";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";
import ServicesP from "./ServicesP";
import { Button } from "@mui/material";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-flexContainer": {
    width: "100%",
    paddingTop: "2px",
  },
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    // width: '100%',
  },
});

interface StyledTabProps {
  label: any;
  icon?: any;
}

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  width: "11.1%",
  textTransform: "none",
  //fontSize: "12px",
  [theme.breakpoints.down("lg")]: {
    fontSize: "10px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "12px",
  },
  fontFamily: "Inter",
  fontWeight: "400",
  lineHeight: "15px",
  color: "#1A1A1A",
  borderRadius: "16px 16px 0px 0px",
  backgroundColor: "#E6E6E6",
  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  whiteSpace: "nowrap",
  overflow: "visible",
  marginTop: "10px",

  "&:hover": {
    boxShadow: "2px -2px 4px rgba(0, 0, 0, 0.25)",
    position: "relative",
    img: {
      width: "30.66px",
      height: "33.79px",
      transform: "translateY(-20px) rotate(26.5deg)",
      transition: "transform 0.3s ease-in",
      zIndex: 100,
      position: "absolute",
      right: "5px",
    },
  },
  "&.Mui-selected": {
    color: "#08979C",
    backgroundColor: "#fff",
    fontWeight: "600",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      // style={{ minHeight: "600px" }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

export default function ScoutByQuickBridge() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const quickBridge = useBoundStore((state) => state.quickBridge);
  const router = useRouter();

  const { tab, setTab, setResult, filter, selectedLabel } = quickBridge;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    var tabName = QuickBridgeTabType.vehile;
    switch (newValue) {
      case 0:
        tabName = QuickBridgeTabType.vehile;
        break;
      case 1:
        tabName = QuickBridgeTabType.oem;
        break;
      case 2:
        tabName = QuickBridgeTabType.class;
        break;
      case 3:
        tabName = QuickBridgeTabType.segment;
        break;
      case 4:
        tabName = QuickBridgeTabType.technology;
        break;
      case 5:
        tabName = QuickBridgeTabType.commodity;
        break;
      case 6:
        tabName = QuickBridgeTabType.productionTech;
        break;
      case 7:
        tabName = QuickBridgeTabType.services;
        break;
      case 8:
        tabName = QuickBridgeTabType.pioneer;
        break;
    }
    setTab(newValue, tabName);
  };

  const showResult = () => {
    setResult(true);
  };
  useEffect(() => {
    if (!tab || tab.tabName) {
      setTab(0, QuickBridgeTabType.vehile);
      console.log("setTab");
    }
  }, [setTab]);

  useEffect(() => {
    setValue(tab.activeTab);
  }, [tab]);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [tabHeight, setTabHeight] = useState("63vh");

  useEffect(() => {
    window.addEventListener("resize", () =>
      setWindowHeight(window.innerHeight)
    );
  });

  useEffect(() => {
    if (windowHeight >= 600 && windowHeight <= 800) setTabHeight("60vh");
    else if (windowHeight > 800 && windowHeight <= 900) setTabHeight("63vh");
    else if (windowHeight > 900 && windowHeight <= 1000) setTabHeight("68vh");
    else if (windowHeight > 1000 && windowHeight <= 1200) setTabHeight("70vh");
    else if (windowHeight > 1200 && windowHeight <= 1400) setTabHeight("75vh");
    else if (windowHeight > 1400 && windowHeight <= 1500) setTabHeight("78vh");
    else if (windowHeight > 1500) setTabHeight("80vh");
  }, [windowHeight]);

  let scoutDisabled = filter?.[Object.keys(filter)?.toString()]?.length == 0;
  return (
    <>
      <div className="Container">
        <div className="Content">
          {!tab.isResult ? (
            <>
              <StyledTabs
                value={value}
                onChange={handleChange}
                aria-label="tabs"
              >
                <StyledTab label="Vehicle" />
                <StyledTab label="OEM" />
                <StyledTab label="Class" />
                <StyledTab label="Segment" />
                <StyledTab label="Technology" />
                <StyledTab label="Commodity" />
                <StyledTab label="Production Tech" />
                <StyledTab label="3P Services" />

                <StyledTab
                  label={
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "-3px" }}>Pioneer</span>
                      <Icon src={"pioneer"} height={18} />
                    </span>
                  }
                />
              </StyledTabs>
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#F9FAFB",
                  borderRadius: "0px 0px 16px 16px",
                  height: tabHeight,
                  overflowY: "auto",
                }}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div
                    style={{ alignItems: "center" }}
                    className="TabPanelWrapper"
                  >
                    <ByVehicle />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div className="TabPanelWrapper">
                    <ByOEM />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <div className="TabPanelWrapper">
                    <ByClass />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={3} dir={theme.direction}>
                  <div className="TabPanelWrapper">
                    <BySegment />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={4} dir={theme.direction}>
                  <div
                    style={{ alignItems: "center" }}
                    className="TabPanelWrapper"
                  >
                    <ByTechnology />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={5} dir={theme.direction}>
                  <div style={{}} className="TabPanelWrapper-FullContents">
                    <ByCommodity />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={6} dir={theme.direction}>
                  <div style={{}} className="TabPanelWrapper-FullContents">
                    <ByProductionTech />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={7} dir={theme.direction}>
                  <div
                    style={{ alignItems: "center" }}
                    className="TabPanelWrapper"
                  >
                    <ServicesP />
                  </div>
                </TabPanel>
                <TabPanel value={value} index={8} dir={theme.direction}>
                  <div style={{}} className="TabPanelWrapper-FullContents">
                    <ByPioneer />
                  </div>
                </TabPanel>
              </Box>
              <div
                style={{
                  marginTop: "18px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={showResult}
                  disabled={scoutDisabled}
                  sx={{
                    color: "#fff",
                    width: "254px",
                    height: "46px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#08979C",
                    borderRadius: "16px",
                    marginBottom: "40px",
                    cursor: "pointer",
                    "&:hover": {
                      background: "#08979C",
                    },
                    "&:active": {
                      background: "#006D75",
                    },
                    "&:disabled": {
                      color: "#ddd",
                      cursor: "not-allowed",
                      pointerEvents: "auto",
                    },
                  }}
                >
                  Scout Now
                </Button>
              </div>
              <Feedback />
            </>
          ) : (
            <QuickbridgeResult />
          )}
        </div>
      </div>

      <style jsx>{`
        .Container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .Content {
          width: 1056px;
          margin-top: 35px;
        }
        @media (max-width: 992px) {
          .Container {
            display: block;
            width: 100%;
          }
        }
        @media (max-width: 1200px) {
          .Content {
            width: 800px;
          }
        }

        .TabPanelWrapper {
          display: flex;
          justify-content: center;
          height: 100%;
        }

        .TabPanelWrapper-FullContents {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
