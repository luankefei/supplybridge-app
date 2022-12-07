import Head from "next/head";
import styled from "styled-components";

import {
  Icon,
  Layout,
  TechnologyBox,
  SearchBar,
  ScoutFilter,
  GeoCharts,
  Filters,
  Modal,
} from "components";
import { ResultCard, Feedback } from "components/scout";
import { useEffect, useState } from "react";
import { useFilter } from "requests/useFilter";

export default function Industry() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { getCommodities, getRegions } = useFilter();

  useEffect(() => {
    getCommodities()
    getRegions()
  }, [])

  return (
    <Layout>
      <>
        <Head>
          <title>Choose an Industry | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <SearchContainer>
          <IconContainer>
            <Icon src="smart-bridge-ai" width={40} height={40} />
            <IconLabel>
              <Label>powered by</Label>
              <Label>SmartBridge Artificial Intelligence</Label>
            </IconLabel>
          </IconContainer>
          <SearchBar />
          {/* <CircleButton onClick={() => setFilterModalVisible(true)}>
            <Icon src="filter" p={"3px"} m={"12px"} hover />
          </CircleButton> */}
        </SearchContainer>
        <TechnologyHeader>Technology:</TechnologyHeader>
        <TechnologyContainer>
          <TechnologyBox
            icon={"fuel-oil"}
            label={"Internal Combustion Engine (ICE)"}
          />
          <TechnologyBox
            icon={"electric-vehicle"}
            label={"Electric Vehicle (EV)"}
          />
          <TechnologyBox icon={"fuel-cell"} label={"Fuel Cell"} />
        </TechnologyContainer>
        <MainContainer>
          <ScoutFilter />
          <ScoutContainer>
            <GeoCharts />
            <Filters />
            <ResultCard />
            <ResultCard />
          </ScoutContainer>
        </MainContainer>
        <Feedback />
        <Modal
          open={filterModalVisible}
          title={"Filter"}
          onClose={() => setFilterModalVisible(false)}
        >
          <ScoutFilter />
        </Modal>
      </>
    </Layout>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 100px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const IconLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const Label = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #89a8b3;
`;

const TechnologyHeader = styled.span`
  margin-top: 32px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: flex-end;
  color: #006d75;
`;
const TechnologyContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 12px;
  padding-bottom: 32px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    flex-direction: column;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ScoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CircleButton = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  margin-left: 15px;
`;
