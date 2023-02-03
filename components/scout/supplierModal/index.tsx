import { Box, Button, Modal, Tab, Tabs, Typography } from "@mui/material";
import { theme } from "config/theme";
import React, { useState } from "react";
import styled from "styled-components";
import { InnovationTabPanel } from "./Innovation";
import { GeneralTabPanel } from "./General";
import { PortfolioTabPanel } from "./Portfolio";
import { Ratings } from "./Ratings";
import { CertificationsTabPanel } from "./Certifications";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "20px 24px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "450px",
  bgcolor: "background.paper",
  borderRadius: "16px",
  boxShadow: 24,
  fontFamily: ["sans-serif", "Inter"],
  fontStyle: "normal",
};

export const SupplierModal = ({ ...props }: any) => {
  const { data } = props;

  const [value, setValue] = useState(0);
  const [isMemberUnlock, setIsMemberUnlock] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 4) {
      setTimeout(() => {
        setIsMemberUnlock(true);
      }, 1000);
    } else {
      setIsMemberUnlock(false);
    }
    setValue(newValue);
  };

  return (
    <>
      <Modal {...props}>
        <Box sx={style}>
          <Head>
            <BrandImage src="/images/demo-xyz-logo.png" />
            <HeadInfo>
              <Title>XYZ Tech (DEMO)</Title>
              <HeadInfoBottom>
                <BadgeContainer>
                  <BadgeIcon src="/icons/verified-green.svg" />
                  <BadgeLabel>Verified Supplier</BadgeLabel>
                </BadgeContainer>
                <Flag src="/icons/flag.svg" />
              </HeadInfoBottom>
            </HeadInfo>
            <CloseIcon src="/icons/close.svg" onClick={() => props.onClose()} />
          </Head>
          <TabContainer>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  TabIndicatorProps={{ sx: { backgroundColor: "#08979c" } }}
                  sx={{
                    "& ": {
                      height: "40px",
                      minHeight: "40px",
                      maxHeight: "40px",
                    },
                    "& .MuiTabs-scrollButtons": { width: "0px", visibility: "hidden" },
                    "& button": {
                      color: "#9CA3AF",
                      height: "40px",
                      minHeight: "40px",
                      maxHeight: "40px",
                      minWidth: "unset",
                      padding: "11.5px 12px",
                      textTransform: "unset",
                    },
                    "& button.Mui-selected": { color: "#08979c" },
                  }}
                >
                  <CustomTab label="General" value={0} />
                  <CustomTab label="Portfolio" value={1} />
                  <CustomTab label="Innovations" value={2} />
                  <CustomTab label="Certifications" value={3} />
                  <CustomTab label="Ratings" value={4} />
                </Tabs>
              </Box>
              <TabPanelContainer>
                <TabPanel value={value} index={0}>
                  <GeneralTabPanel />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PortfolioTabPanel />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <InnovationTabPanel />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <CertificationsTabPanel />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <Ratings />
                </TabPanel>
              </TabPanelContainer>
            </Box>
          </TabContainer>
          <Bottom isMemberUnlock={isMemberUnlock}>
            <ModalButton>Send RFQ</ModalButton>
          </Bottom>
          <UnlockMemberContainer isMemberUnlock={isMemberUnlock}>
            <UnlockIcon src="/icons/unlock-member.svg"></UnlockIcon>
            <UnlockText>Unlock With Membership</UnlockText>
          </UnlockMemberContainer>
        </Box>
      </Modal>
    </>
  );
};

const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* width: 70%; */
  height: 116px;
  padding: 24px;
`;

const BrandImage = styled.img`
  height: 68px;
  width: 68px;
  border-radius: 2px;
  padding: 5px;
  object-fit: contain;
`;

const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap:12px;
  margin-left: 20px;
`;

const CustomTab = styled(Tab)`
  text-transform: none;
  font-family: "Inter", sans-serif;
`;

const CloseIcon = styled.img`
  width: 16px;
  position: absolute;
  right: 24px;
  top: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  color: ${theme.colors.text}
`;

const HeadInfoBottom = styled.div`
  display: flex;
`;

const BadgeContainer = styled.div`
  border-radius: 28px;
  background-color: #e6f5f5;
  padding: 4px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const BadgeIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const BadgeLabel = styled.span`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #08979c;
`;

const Flag = styled.img`
  align-self: flex-end;
  margin-left: 48px;
  margin-bottom: 4px;
`;

const TabContainer = styled.div`
  height: 600px;
  font-family: "Inter", sans-serif;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    height: 500px;
  }
`;

const TabPanelContainer = styled.div`
  height: 450px;
  overflow-y: overlay;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    height: 350px;
  }
`;

const Bottom = styled.div<any>`
  /* visibility: ${(props) => (props.isMemberUnlock ? "visible" : "hidden")}; */
  visibility: visible;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 104px;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 30px 25px;
`;

const ModalButton = styled.div`
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
  background: ${theme.colors.primary};
  border-radius: 8px;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: #fff;
`;

const UnlockMemberContainer = styled.div<any>`
  visibility: ${(props) => (props.isMemberUnlock ? "visible" : "hidden")};
  position: absolute;
  bottom: 185px;
  overflow-y: overlay;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    bottom: 140px;
  }
  left: 25px;
  width: 400px;
  height: 220px;
  border: 1px solid #d9b535;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UnlockIcon = styled.img`
  width: 100px;
`;
const UnlockText = styled.div`
  font-size: 24px;
  line-height: 29px;
  color: #dbcf62;
`;
