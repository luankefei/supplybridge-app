import { Box, Button, Modal, Tab, Tabs, Typography } from "@mui/material";
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
    if (newValue === 3) {
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
            <ImageContainer>
              <BrandImage src="/images/demo-xyz-logo.png" />
            </ImageContainer>
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
                  variant="fullWidth"
                  TabIndicatorProps={{ sx: { backgroundColor: "#08979c" } }}
                  sx={{
                    "& button": { color: "#08979c" },
                    "& button.Mui-selected": { color: "#08979c" },
                  }}
                >
                  <CustomTab label="General" value={0} />
                  <CustomTab label="Portfolio" value={1} />
                  <CustomTab label="Capabilities" value={2} />
                  <CustomTab label="Ratings" value={3} />
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
                  <CapabilitiesTabPanel />
                </TabPanel>
                <TabPanel value={value} index={3}>
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
  /* width: 70%; */
  margin-bottom: 25px;
  height: 80px;
`;

const ImageContainer = styled.div`
  background: #fff;
  border-radius: 2px;
  max-width: 110px;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
`;

const BrandImage = styled.img`
  height: 64px;
  width: auto;
  border-radius: 8px;
  padding: 5px;
`;

const HeadInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
`;

const CustomTab = styled(Tab)`
  text-transform: none;
  font-family: "Inter", sans-serif;
`;
const CloseIcon = styled.img`
  width: 16px;
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
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
