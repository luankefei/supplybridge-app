import * as React from "react";
import { useState } from "react";
import { theme } from "config/theme";
import ScoutByIndex from "./scoutByIndex";
import ScoutByQuickBridge from "./scoutByQuickBridge";
import BidderPart from "../bidder/index";
import styled from "styled-components";
import { Box } from "@mui/material";
import { ScoutSwitchType } from "./types";
import { useTranslation } from "react-i18next";
import BidderList from "./bidderList";
import AppLanguage from "components/appLanguage";

export default function ScoutingMain() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(ScoutSwitchType.index);
  const handleSwitchSelected = (val: ScoutSwitchType) => {
    setSelected(val);
  };

  return (
    <Box>
      <SwitchContainer>
        <Switches>
          <Background selected={selected}></Background>
          <ByIndex
            selected={selected}
            onClick={() => {
              handleSwitchSelected(ScoutSwitchType.index);
            }}
          >
            {t("scout.tab.byIndex", "Scout by Index")}
          </ByIndex>
          <ByQuickBridge
            selected={selected}
            onClick={() => handleSwitchSelected(ScoutSwitchType.quickBridge)}
          >
            {t("scout.tab.byQuickbridge", "Scout by QuickBridge")}
          </ByQuickBridge>
          <ByBidder
            selected={selected}
            onClick={() => handleSwitchSelected(ScoutSwitchType.bidder)}
          >
            {t("scout.tab.biddersList", "Bidders List")}
          </ByBidder>
        </Switches>
        <Box alignContent="center" alignItems="center" display="flex" paddingRight="2rem">
          <AppLanguage />
        </Box>
      </SwitchContainer>

      {selected === ScoutSwitchType.index && <ScoutByIndex />}
      {selected === ScoutSwitchType.quickBridge && <ScoutByQuickBridge />}
      {/* {selected === ScoutSwitchType.bidder && <BidderList />} */}
      {selected === ScoutSwitchType.bidder && <BidderPart />}
    </Box>
  );
}

const SwitchContainer = styled.div`
  @media (min-width: ${theme.dimension.cardMaxWidth}) {
    width: ${theme.dimension.cardMaxWidth};
  }
  height: 56px;
  margin: 36px 20px 0 20px;
  display: flex;
  justify-content: space-between;
`;

const Switches = styled.div`
  width: 522px;
  height: 56px;
  background: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Background = styled.div<any>`
  left: ${(props) =>
    props.selected === ScoutSwitchType.index
      ? "5px"
      : props.selected === ScoutSwitchType.quickBridge
      ? "169px"
      : "345px"};
  top: 5;
  position: absolute;
  width: 174px;
  height: 46px;
  background: #08979c;
  border-radius: 16px;
  transition: 0.5s;
`;
const ByIndex = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) =>
    props.selected === ScoutSwitchType.index ? "#fff" : "#808080"};
  cursor: pointer;
  background: transparent;
  position: relative;
  transition: 0.5s;
`;

const ByQuickBridge = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) =>
    props.selected === ScoutSwitchType.quickBridge ? "#fff" : "#808080"};
  cursor: pointer;
  background: transparent;
  position: relative;
  transition: 0.5s;
`;

const ByBidder = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) =>
    props.selected === ScoutSwitchType.bidder ? "#fff" : "#808080"};
  cursor: pointer;
  background: transparent;
  position: relative;
  transition: 0.5s;
`;
