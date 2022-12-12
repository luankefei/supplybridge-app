import Head from "next/head";
import styled from "styled-components";
import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";

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
import { useSupplier } from "requests/useSupplier";
import useStore from "hooks/useStore";

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
  } = useStore();

  const handleScrollCallback = useCallback(() => handleScroll(), []);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [vehicleFuelType, setVehicleFuelType] = useState<number | null>(null);

  const countRef = useRef(supplierCount);
  const pageRef = useRef(1);

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

  const searchSupplierHandler = async () => {
    // TODO
    const currentPage = pageRef.current;
    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1);
      pageRef.current = currentPage + 1;
    }
  };

  const handleScroll = async () => {
    var isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom && !loading) {
      setPage(page + 1);
      await searchSupplierHandler();
    }
  };

  const setFuelType = (value: number) => {
    if (vehicleFuelType !== value) {
      setVehicleFuelType(value);
    } else {
      setVehicleFuelType(null);
    }
    setFilterData({ vehicleFuelType: value });
  };

  const onSearch = () => {
    console.log("filter", filterData);
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
            <SearchBar />
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
                isSelected={vehicleFuelType === 1}
                onClick={() => setFuelType(1)}
              />
              <TechnologyBox
                icon={"electric-vehicle"}
                label={"Electric Vehicle (EV)"}
                isSelected={vehicleFuelType === 2}
                onClick={() => setFuelType(2)}
              />
              <TechnologyBox
                icon={"fuel-cell"}
                label={"Fuel Cell"}
                isSelected={vehicleFuelType === 3}
                onClick={() => setFuelType(3)}
              />
            </TechnologyContainer>
          </Technology>
          <MainContainer>
            <div>
              <ScoutFilter />
              <div>Clear Filter</div>
              <div onClick={onSearch}>Search</div>
            </div>
            <MapResultContainer>
              <GeoCharts />
              <Filters totalCount={count} />
              <ResultContainer>
                {suppliers.map((supplier: any, index: number) => (
                  <ResultCard data={supplier} key={`${supplier.id}_${index}`} />
                ))}
              </ResultContainer>
            </MapResultContainer>
          </MainContainer>
          <Feedback />
        </ScoutContainer>
        {/* <Modal
          open={filterModalVisible}
          title={"Filter"}
          onClose={() => setFilterModalVisible(false)}
        >
          <ScoutFilter />
        </Modal> */}
      </>
    </Layout>
  );
}

const ScoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: block;
    width: 100%;
  }
  @media (min-width: ${(props) => props.theme.size.laptopL}) {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 75%;
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

const MapResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
