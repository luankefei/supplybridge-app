import Head from "next/head";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { Skeleton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useSupplier } from "requests/useSupplier";
import useStore from "hooks/useStore";
import { useViewport } from "hooks/useViewport";
import { useFilter } from "requests/useFilter";
import { useVehicleFuelTypes } from "requests/useVehicleFuelTypes";

const Icon = dynamic(() => import("components/Icon"));
const Layout = dynamic(() => import("components/Layout"));

const GeoCharts = dynamic(() => import("components/scout/GeoCharts"));
const ResultCard = dynamic(() => import("components/scout/ResultCard"));
const Feedback = dynamic(() => import("components/Feedback"));
const TechnologyBox = dynamic(() => import("components/scout/TechnologyBox"));
const SearchBar = dynamic(() => import("components/scout/SearchBar"));
const ScoutFilter = dynamic(() => import("components/scout/ScoutFilter"));
const Filters = dynamic(() => import("components/scout/Filters"));

interface Props {
  commodities: any;
  regions: any;
  suppliersData: any;
  supplierCount: number;
}

interface SearchProps {
  scrollPosition: number;
}

export default function Industry({ }: Props) {
  const {
    suppliers,
    page,
    setPage,
    count,
    setFilterData,
    filterData,
    clearFilterData,
    vehicleFuelTypes,
  } = useStore();
  const { scrollOffset } = useViewport();
  const { getCommodities, getRegions } = useFilter();
  const { searchSuppliers, loading } = useSupplier();
  const { searchFuelTypes } = useVehicleFuelTypes();

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const clearRef = useRef(false);
  const pageLoaded = useRef(false);
  const searchString = useRef(filterData.q);

  useEffect(() => {
    getInitialRequests();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    searchString.current = filterData.q;
    if (clearRef.current) {
      searchHandler();
      clearRef.current = false;
    }
  }, [filterData]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  const getInitialRequests = () => {
    if (!pageLoaded.current) {
      pageLoaded.current = true;
      getCommodities();
      getRegions();
      searchSuppliers(1, true);
      searchFuelTypes();
    }
  };

  const searchSupplierHandler = async () => {
    const currentPage = pageRef.current;
    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1, false, searchString.current);
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
    if (filterData.vehicleFuelTypes.includes(value)) {
      setFilterData({ vehicleFuelTypes: [] });
    } else {
      setFilterData({ vehicleFuelTypes: [value] });
    }
  };

  const searchHandler = () => {
    pageRef.current = 1;
    searchSuppliers(1, true);
    infiniteScrollControl.current = true;
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
          <DuplicateHeaderForPosition scrollPosition={scrollOffset}>
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
          </DuplicateHeaderForPosition>
          <Technology>
            <TechnologyHeader>Technology:</TechnologyHeader>
            <TechnologyContainer>
              {vehicleFuelTypes.length > 1 ? (
                vehicleFuelTypes.map((item: any, index: number) => (
                  <TechnologyBoxContainer key={`${item.name}_${index}`}>
                    <TechnologyBox
                      icon={item?.icon}
                      label={item?.name}
                      isSelected={filterData.vehicleFuelTypes.includes(
                        item?.id
                      )}
                      onClick={() => setFuelType(item?.id)}
                    />
                  </TechnologyBoxContainer>
                ))
              ) : (
                <TechnologySkeletonContainer>
                  <Skeleton animation="wave" width={242} height={125} />
                  <Skeleton animation="wave" width={242} height={125} />
                  <Skeleton animation="wave" width={242} height={125} />
                </TechnologySkeletonContainer>
              )}
            </TechnologyContainer>
          </Technology>

          <MainContainer>
            <div>
              <ScoutFilter />
              <Button secondary onClick={clearHandler}>
                Clear Filter
              </Button>
              <Button onClick={() => searchHandler()}>Search</Button>
            </div>
            <MapResultContainer>
              <GeoCharts />
              <Filters totalCount={count} />
              <ResultContainer>
                {suppliers?.length > 0 ? (
                  <>
                    {suppliers.map((supplier: any, index: number) => (
                      <ResultCard
                        data={supplier}
                        key={`${supplier.id}_${index}`}
                      />
                    ))}
                  </>
                ) : null}
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
  max-width: 1440px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
`;

const DuplicateHeaderForPosition = styled.div<SearchProps>`
  position: ${(props) => (props.scrollPosition > 126 ? "fixed" : "relative")};
  background-color: ${(props) => (props.scrollPosition > 126 ? "white" : "")};
  box-shadow: ${(props) =>
    props.scrollPosition > 126
      ? "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      : ""};
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  transition: background-color 100ms linear;
  transition: position 50ms linear;
  justify-content: center;
  height: 90px;
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

const TechnologySkeletonContainer = styled.div`
  display: flex;
  width: 100%;
  span {
    margin-right: 12px;
    margin-bottom: -21px;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    flex-direction: column;
  }
`;

const TechnologyBoxContainer = styled.div`
  display: contents;
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
  background-color: ${(props) => `${props.theme.colors.secondary}`};
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

// export async function getServerSideProps({ req }: any) {
//   const token = req.cookies.token;
//   // const refreshToken = req.cookies.refreshToken;
//   // TODO: Implement refreshToken logic

//   const [respCommodities, respRegion, respSuppliers]: any = await Promise.all([
//     axios.get("https://supplyapi.kampp.in/scout/commodities", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }),
//     axios.get("https://supplyapi.kampp.in/scout/regions", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }),
//     fetch("https://supplyapi.kampp.in/supplier/search?page=1&pageSize=10", {
//       method: "POST",
//       headers: {
//         "Content-Type": "text/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }).then((res) => res.json()),
//   ]);

//   return {
//     props: {
//       commodities: respCommodities.data.commodities,
//       regions: respRegion.data.regions,
//       suppliersData: respSuppliers.suppliers,
//       supplierCount: respSuppliers.count,
//     },
//   };
// }
