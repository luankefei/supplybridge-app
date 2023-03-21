import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { Box, Skeleton } from "@mui/material";

import { useSupplier } from "requests/useSupplier";
import useStore from "hooks/useStore";
import { useViewport } from "hooks/useViewport";
import { useFilter } from "requests/useFilter";
import { useVehicleFuelTypes } from "requests/useVehicleFuelTypes";

const Icon = dynamic(() => import("components/Icon"));

const BackDrop = dynamic(() => import("components/scout/BackDrop"));
const GeoCharts = dynamic(() => import("components/scout/GeoCharts"));
const ResultCard = dynamic(() => import("components/scout/ResultCard"));
const Feedback = dynamic(() => import("components/Feedback"));
const TechnologyBox = dynamic(() => import("components/scout/TechnologyBox"));
import { SearchBar2 } from "components/scout/SearchBar";
import { theme } from "config/theme";
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

export default function ScoutByIndex() {
  const {
    suppliers,
    page,
    setPage,
    count,
    setFilterData,
    filterData,
    clearFilterData,
    vehicleFuelTypes,
    showBackdrop,
  } = useStore();
  const { scrollOffset } = useViewport();
  const { getCommodities, getRegions } = useFilter();
  const { searchSuppliers, loading } = useSupplier();
  const { searchFuelTypes } = useVehicleFuelTypes();

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
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
  };
  const isSuppliersNotEmpty: boolean = suppliers?.length > 0 && Object.keys(suppliers[0]).length > 0
  return (
    <ScoutContainer>
      <MainContainer>
        <SearchContainer isrow={isSuppliersNotEmpty}>
          {(!isSuppliersNotEmpty) && (
            <Title>Global Scouting, for Automotive professionals.</Title>
          )}
          <IconContainer isrow={isSuppliersNotEmpty}>
            <Icon src="smart-bridge-ai" width={25} height={25} />
            <IconLabel>
              <Label>powered by {(isSuppliersNotEmpty) && <br />}SmartBridge Artificial Intelligence</Label>
            </IconLabel>
          </IconContainer>
          <SearchBar2 onSearch={searchHandler} />
        </SearchContainer>
        <ContentsContainer>
          <BackDrop isOpen={!isSuppliersNotEmpty && showBackdrop} />
          <ContentsWrapper>
            <GeoCharts />
            {(isSuppliersNotEmpty) && <Filters totalCount={count} />}
            <ScoutFilter />

            <ResultContainer>
              {(isSuppliersNotEmpty) ? (
                <>
                  {suppliers.map((supplier: any, index: number) => (
                    <ResultCard data={supplier} key={`${supplier.id}_${index}`} />
                  ))}
                </>
              ) : null}
            </ResultContainer>
            {/* {suppliers.length === 0 && !loading && (
                <NoRecord>No record founds</NoRecord>
              )} */}
          </ContentsWrapper>
        </ContentsContainer>
      </MainContainer>
      <Feedback />
    </ScoutContainer>
  );
}

const Title = styled.div`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 22px;
  display: flex;
  align-items: flex-end;
  color: #445B66;
  margin-top: 70px;
  @media (max-width: ${(props) => props.theme.size.laptopL}) {
    margin-top: 50px;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin-top: 48px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    margin-top: 30px;
  }
`
const ScoutContainer = styled.div`
  width: 100%;
  margin: 0px 5px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: block;
    width: 100%;
  }
  @media (max-width: ${(props) => props.theme.size.laptop}) {
  margin: 10px 10px;
  }
`;

const SearchContainer = styled.div<{ isrow: boolean }>`
  width: 100%;
  @media (min-width: ${theme.dimension.cardMaxWidth}) {
    width: ${theme.dimension.cardMaxWidth};
  }
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  flex-direction: ${(props) => (props.isrow ? 'row' : "column")};
  gap: 15px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    flex-direction: column;
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

const IconContainer = styled.div<{ isrow: boolean }>`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: ${(props) => (props.isrow ? 'end' : "center")};
  align-items: center;
  margin-bottom: ${(props) => (props.isrow ? '14px' : "")};
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
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #89A8B3;
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
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoRecord = styled.div`
  margin-top: 16px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ResultContainer = styled.div`
`;

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

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: calc(100%);
  height: calc(100%);
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;