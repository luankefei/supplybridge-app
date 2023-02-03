import { useState } from "react";
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

const Feedback = dynamic(() => import("components/scout/Feedback"));

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
  width: "12.5%",
  textTransform: "none",
  fontSize: "12px",
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
      transform: 'translateY(-20px) rotate(26.5deg)',
      transition: 'transform 0.3s ease-in',
      zIndex: 100,
      position: "absolute",
      right: "5px",
    },
  },
  "&.Mui-selected": {
    color: "#08979C",
    backgroundColor: "#fff",
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="Container">
        <div className="Content">
          <StyledTabs value={value} onChange={handleChange} aria-label="tabs">
            <StyledTab label="By Vehicle" />
            <StyledTab label="By OEM" />
            <StyledTab label="By Class" />
            <StyledTab label="By Segment" />
            <StyledTab label="By Technology" />
            <StyledTab label="By Commodity" />
            <StyledTab label="By Production Tech" />
            <StyledTab
              label={
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span style={{ marginRight: "-3px" }}>By Pioneer</span>
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
              height: "606px",
              overflow: "overlay",
            }}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div style={{ alignItems: "center" }} className="TabPanelWrapper">
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
              <div style={{ alignItems: "center" }} className="TabPanelWrapper">
                <ByTechnology />
              </div>
            </TabPanel>
            <TabPanel value={value} index={5} dir={theme.direction}>
              <div style={{ alignItems: "center" }} className="TabPanelWrapper">
                <ByCommodity />
              </div>
            </TabPanel>
            <TabPanel value={value} index={6} dir={theme.direction}>
              <div style={{ alignItems: "center" }} className="TabPanelWrapper">
                <ByProductionTech />
              </div>
            </TabPanel>
            <TabPanel value={value} index={7} dir={theme.direction}>
              <div style={{ alignItems: "center" }} className="TabPanelWrapper">
                <ByPioneer />
              </div>
            </TabPanel>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              marginTop: "18px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
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
              }}
            >
              Scout Now
            </Box>
          </Box>
          <Feedback />
        </div>
      </div>

      <style jsx>{`
        .Container {
          width: 100%;
          height: 80vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .Content {
          width: 1056px;
          height: 606px;
        }
        @media (max-width: 992px) {
          .Container {
            display: block;
            width: 100%;
          }
        }

        .TabPanelWrapper {
          display: flex;
          justify-content: center;
          height: 100%;
        }
      `}</style>
    </>
  );
}
