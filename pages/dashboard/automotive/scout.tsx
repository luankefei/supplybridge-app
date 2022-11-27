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
} from "components";
import { ResultCard } from "components/scout/ResultCard";

export default function Industry() {
  return (
    <Layout>
      <>
        <Head>
          <title>Choose an Industry | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <SearchContainer>
            <IconContainer>
              <Icon src="smart-bridge-ai" width={40} height={40} />
              <IconLabel>
                <Label>powered by</Label>
                <Label>SmartBridge Artificial Intelligence</Label>
              </IconLabel>
            </IconContainer>
            <SearchBar />
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
            </ScoutContainer>
          </MainContainer>
        </main>
      </>
    </Layout>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
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
`;
