import {
  Box,
  Button,
  Divider,
  Modal,
  Tab,
  Tabs,
  Typography,
  useIsFocusVisible,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { CapabilitiesTabPanel } from "./Capabilities";
import { GeneralTabPanel } from "./General";
import { PortfolioTabPanel } from "./Portfolio";
import { Ratings } from "./Ratings";

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
        <Box sx={{ p: 3 }}>
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
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export const SupplierModal = ({ ...props }: any) => {
  const { data } = props;


  const [value, setValue] = useState(0);
  const [isMemberUnlock, setIsMemberUnlock] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Modal {...props}>
        <Box sx={style}>
          <Head>
            <Icon src="/images/bosch.png" />
            <HeadInfo>
              <Title>{data?.firmName}</Title>
              <HeadInfoBottom>
                <BadgeContainer>
                  <BadgeIcon src="/icons/verified-green.svg" />
                  <BadgeLabel>Verified Supplier</BadgeLabel>
                </BadgeContainer>
                <Flag src="/icons/flag.svg" />
              </HeadInfoBottom>
            </HeadInfo>

          </Head>
          <TabContainer>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  <Tab
                    style={{ textTransform: "none" }}
                    label="General"
                    value={0}
                  />
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Portfolio"
                    value={1}
                  />
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Capabilities"
                    value={2}
                  />
                  <Tab
                    style={{ textTransform: "none" }}
                    label="Ratings"
                    value={3}
                  />
                </Tabs>
              </Box>
              <Box sx={{ height: "450px", overflowY: "overlay" }}>
                <TabPanel value={value} index={0}>
                  <GeneralTabPanel />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <PortfolioTabPanel />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <CapabilitiesTabPanel />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Ratings />
                </TabPanel>
              </Box>
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
  /* width: 70%; */
  margin-bottom: 25px;
`;

const Icon = styled.img`
  height: 64px;
  width: auto;
  border-radius: 8px;
`;

const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

const Title = styled.div``;

const HeadInfoBottom = styled.div`
  display: flex;
`;

const BadgeContainer = styled.div`
  width: 150px;
  height: 28px;
  border-radius: 28px;
  background-color: #e6f5f5;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const BadgeIcon = styled.img``;
const BadgeLabel = styled.span`
  font-weight: 200;
  font-size: 14px;
  line-height: 20px;
  color: #08979c;
`;

const Flag = styled.img`
  align-self: flex-end;
  margin-left: 10px;
  margin-bottom: 4px;
`;

const TabContainer = styled.div`
  height: 600px;
`;

const Bottom = styled.div<any>`
  /* visibility: ${(props) => (props.isMemberUnlock ? "visible" : "hidden")}; */
  visibility: visible;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 104px;
  border-top: 1px solid rgb(0, 0, 0, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 30px 25px;
`;

const ModalButton = styled.div`
  background: #08979c;
  border-radius: 8px;
  width: 100%;
  padding: 10px 0;
  text-align: center;
  color: #fff;
`;

const UnlockMemberContainer = styled.div<any>`
  visibility: ${(props) => (props.isMemberUnlock ? "visible" : "hidden")};
  position: absolute;
  bottom: 230px;
  left: 50px;
  width: 400px;
  height: 220px;
  border: 1px solid #D9B535;
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
  color: #DBCF62;
`;