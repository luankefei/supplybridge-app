import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState, useCallback, useRef } from "react";

import {
  Icon,
  TechnologyBox,
  SearchBar,
  ScoutFilter,
  Filters,
} from "components";
import { ResultCard, Feedback } from "components/scout";
import { useSupplier } from "requests/useSupplier";
import useStore from "hooks/useStore";
import Layout from "components/Layout";

const GeoCharts = dynamic(() => import("components/scout/GeoCharts"));

interface Props {
  commodities: any;
  regions: any;
  suppliersData: any;
  supplierCount: number;
}

export default function Industry({
  commodities,
  regions,
  suppliersData,
  supplierCount,
}: Props) {
  const { searchSuppliers, loading } = useSupplier();
  const {
    suppliers,
    setSuppliers,
    setCommodities,
    setRegions,
    page,
    setPage,
    count,
    setCount,
    setFilterData,
    filterData,
    clearFilterData,
  } = useStore();

  const handleScrollCallback = useCallback(() => handleScroll(), []);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(supplierCount);
  const pageRef = useRef(1);
  const clearRef = useRef(false);

  useEffect(() => {
    setSuppliers(suppliersData);
    setCount(supplierCount);
    setCommodities(commodities);
    setRegions(regions);

    window.addEventListener("scroll", handleScrollCallback);
    return () => {
      window.removeEventListener("scroll", handleScrollCallback);
    };
  }, []);

  useEffect(() => {
    if (clearRef.current) {
      searchHandler();
      clearRef.current = false;
    }
  }, [filterData]);

  const searchSupplierHandler = async () => {
    // TODO
    const currentPage = pageRef.current;
    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1, false);
      pageRef.current = currentPage + 1;
      infiniteScrollControl.current = true;
    }
  };

  const handleScroll = async () => {
    var isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom && infiniteScrollControl.current) {
      infiniteScrollControl.current = false;
      setPage(page + 1);
      await searchSupplierHandler();
    }
  };

  const setFuelType = (value: number) => {
    if (filterData.vehicleFuelType !== value) {
      setFilterData({ vehicleFuelType: value });
    } else {
      setFilterData({ vehicleFuelType: null });
    }
  };

  const searchHandler = () => {
    pageRef.current = 1;
    searchSuppliers(1);
  };

  const clearHandler = () => {
    clearFilterData();
    clearRef.current = true;
  };

  return (
    <Layout>
      <>
        <Head>
          <title>Choose an Industry | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ScoutContainer>
          <SearchContainer>
            <IconContainer>
              <Icon src="smart-bridge-ai" width={40} height={40} />
              <IconLabel>
                <Label>powered by</Label>
                <Label>SmartBridge Artificial Intelligence</Label>
              </IconLabel>
            </IconContainer>
            <SearchBar onSearch={searchHandler} />
            <CircleButton onClick={() => setFilterModalVisible(true)}>
              <Icon src="filter" p={"3px"} m={"12px"} hover />
            </CircleButton>
          </SearchContainer>

          <Technology>
            <TechnologyHeader>Technology:</TechnologyHeader>
            <TechnologyContainer>
              <TechnologyBox
                icon={"fuel-oil"}
                label={"Internal Combustion Engine (ICE)"}
                isSelected={filterData.vehicleFuelType === 1}
                onClick={() => setFuelType(1)}
              />
              <TechnologyBox
                icon={"electric-vehicle"}
                label={"Electric Vehicle (EV)"}
                isSelected={filterData.vehicleFuelType === 2}
                onClick={() => setFuelType(2)}
              />
              <TechnologyBox
                icon={"fuel-cell"}
                label={"Fuel Cell"}
                isSelected={filterData.vehicleFuelType === 3}
                onClick={() => setFuelType(3)}
              />
            </TechnologyContainer>
          </Technology>

          <MainContainer>
            <div>
              <ScoutFilter onSearch={searchHandler} />
              <Button secondary onClick={clearHandler}>
                Clear Filter
              </Button>
              <Button onClick={searchHandler}>Search</Button>
            </div>
            <MapResultContainer>
              <GeoCharts />
              <Filters totalCount={count} />
              <ResultContainer>
                {loading && <ResultCard key={`loader`} />}
                {suppliers.map((supplier: any, index: number) => (
                  <ResultCard data={supplier} key={`${supplier.id}_${index}`} />
                ))}
              </ResultContainer>
              {suppliers.length === 0 && !loading && (
                <NoRecord>No record founds</NoRecord>
              )}
            </MapResultContainer>
          </MainContainer>
          <Feedback />
        </ScoutContainer>
      </>
    </Layout>
  );
}

const ScoutContainer = styled.div`
  width: 1440px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: block;
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 100px;
  min-width: 240px;
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

const Technology = styled.span`
  width: 100%;
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

const NoRecord = styled.div`
  margin-top: 16px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const MapResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin-left: 0;
  }
`;

const ResultContainer = styled.div``;

const CircleButton = styled.div`
  background-color: ${(props) => `${props.theme.colors.primary}`};
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  user-select: none;
  margin-left: 15px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: flex;
  }
`;

const Button = styled.div<{ secondary?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px !important;
  background-color: ${(props) => (props.secondary ? "#F5F5F5" : "#08979C")};
  color: ${(props) => (props.secondary ? "#08979C;" : "#F5F5F5")};
  margin-bottom: 8px;
  border: 1px solid #08979c;
  padding: 12px;
  cursor: pointer;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

export async function getServerSideProps({ req }: any) {
  const token = req.cookies.token;
  // const refreshToken = req.cookies.refreshToken;
  // TODO: Implement refreshToken logic

  const [respCommodities, respRegion, respSuppliers]: any = await Promise.all([
    axios.get("https://supplyapi.kampp.in/scout/commodities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }),
    axios.get("https://supplyapi.kampp.in/scout/regions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch("https://supplyapi.kampp.in/supplier/search?page=1&pageSize=10", {
      method: "POST",
      headers: {
        "Content-Type": "text/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json()),
  ]);

  return {
    props: {
      commodities: respCommodities.data.commodities,
      regions: respRegion.data.regions,
      suppliersData: respSuppliers.suppliers,
      supplierCount: respSuppliers.count,
    },
  };
}
