import styled from "styled-components";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Skeleton,
  Paper,
  // Modal,
} from "@mui/material";
import { Carousel, Modal } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import LoadingAnimation from "components/LoadingAnimation";
import Survicate from "components/Survicate";

// import { Paper, Button } from '@material-ui/core';
import styles from "./styles.module.css";

import { useSupplier } from "requests/useSupplier";
import useStore from "hooks/useStore";
import { useViewport } from "hooks/useViewport";
import { useFilter } from "requests/useFilter";
import { useVehicleFuelTypes } from "requests/useVehicleFuelTypes";

import Summary from "components/scout/Summary";
import ResultTable, { ResultSelected } from "components/scout/ResultTable";
import GeoCharts from "components/scout/GeoCharts";

const Icon = dynamic(() => import("components/Icon"));

const BackDrop = dynamic(() => import("components/scout/BackDrop"));
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
  const { t } = useTranslation();
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
    flags,
    stats,
  } = useStore();
  const { getCommodities, getRegions } = useFilter();
  const { searchSuppliers } = useSupplier();
  const { searchFuelTypes } = useVehicleFuelTypes();
  const [loadingAnimations, setLoadingAnimations] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const onFilterModalCancel = () => setFilterModalVisible(false);
  const [surveyOn, setSurveyOn] = useState(false);

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const pageLoaded = useRef(false);
  const searchString = useRef(filterData.q);
  const thisElementRef = useRef(null);

  useEffect(() => {
    getInitialRequests();
  }, []);

  useEffect(() => {
    let scrollable: any = thisElementRef.current;
    let last = scrollable;
    while (scrollable) {
      if (
        scrollable.clientHeight === scrollable.scrollHeight &&
        last.clientHeight < last.scrollHeight
      ) {
        scrollable = last;
        break;
      }
      last = scrollable;
      scrollable = scrollable.parentNode;
    }
    if (!scrollable) return;
    scrollable.addEventListener("scroll", handleScroll);
    return () => {
      scrollable.removeEventListener("scroll", handleScroll);
    };
  }, [thisElementRef, suppliers]);

  useEffect(() => {
    if (!flags.q) {
      searchString.current = "";
      return;
    }
    searchString.current = filterData.q;
  }, [filterData]);

  useEffect(() => {
    countRef.current = stats?.count || count;
  }, [count, stats]);

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

  const handleScroll = async (evt: any) => {
    const isAtBottom =
      evt.target.scrollHeight - evt.target.scrollTop - evt.target.clientHeight <
      1;

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
    // setIsSearching(true);
    setLoadingAnimations(true);
    console.log("searching.....");
  };

  const clearHandler = () => {
    clearFilterData();
  };

  const isSuppliersNotEmpty: boolean =
    suppliers?.length > 0 && Object.keys(suppliers[0]).length > 0;

  const onSelectedBackClick = () => {
    flags.selected = null;
    const q = flags.back;
    flags.back = "";
    flags.type = "Companies";
    clearFilterData();
    setFilterData({ q });
  };

  const carouselRef = useRef<CarouselRef>(null);

  const filerImg = [
    { src: "filter1_general.png" },
    { src: "filter2_global_footprint.png" },
    { src: "filter3_engineering.png" },
    { src: "filter4_certificate.png" },
    { src: "filter5_portfolio.png" },
    { src: "filter6_pioneer.png" },
  ];

  useEffect(() => {
    if (loadingAnimations) {
      setTimeout(() => setLoadingAnimations(false), 1500);
    }
  }, [loadingAnimations]);

  return (
    <ScoutContainer ref={thisElementRef}>
      <Modal
        maskStyle={{ background: "#1A1A1A", opacity: "80%" }}
        open={filterModalVisible}
        footer={null}
        width={800}
        zIndex={900}
        onCancel={onFilterModalCancel}
        style={{
          height: "800px",
          position: "absolute",
          right: "180px",
          left: "400px",
        }}
      >
        <div>
          <div
            style={{ position: "absolute", left: "-36px", bottom: "260px" }}
            onClick={() => carouselRef.current?.prev()}
          >
            <CarouselLeft />
          </div>
          <Carousel
            ref={carouselRef}
            dots={{ className: styles.carouselDots }}
            effect="scrollx"
          >
            {filerImg.map((i) => (
              <div
                key={i.src}
                style={{
                  margin: 0,
                  height: "600px",
                  width: "460px",
                  color: "#fff",
                  lineHeight: "160px",
                  textAlign: "center",
                  background: "#364d79",
                }}
              >
                <img src={i.src} width={"640px"} style={{ margin: "0 auto" }} />
              </div>
            ))}
          </Carousel>
          <div
            style={{ position: "absolute", right: "-36px", bottom: "260px" }}
            onClick={() => carouselRef.current?.next()}
          >
            <CarouselRight />
          </div>
        </div>
      </Modal>

      {loadingAnimations ? (
        <LoadingAnimationContainer>
          <LoadingAnimation showType="short" />
        </LoadingAnimationContainer>
      ) : (
        <MainContainer>
          {flags.selected ? (
            <SelectedBackButtonContainer>
              <SelectedBackButton onClick={onSelectedBackClick}>
                <span>&#x1f860;</span> BACK
              </SelectedBackButton>
            </SelectedBackButtonContainer>
          ) : (
            <SearchContainer isrow={isSuppliersNotEmpty}>
              {!isSuppliersNotEmpty && (
                <Title>
                  {t(
                    "scout.title",
                    "Global Scouting, for Automotive professionals."
                  )}
                </Title>
              )}
              <IconContainer isrow={isSuppliersNotEmpty}>
                <Icon src="smart-bridge-ai" width={25} height={25} />
                <IconLabel>
                  <Label>
                    {t("scout.poweredBy", "powered by")}{" "}
                    {isSuppliersNotEmpty && <br />}SmartBridge AI
                  </Label>
                </IconLabel>
              </IconContainer>
              <SearchBar2 onSearch={searchHandler} />
            </SearchContainer>
          )}
          <ContentsContainer>
            <BackDrop isOpen={!isSuppliersNotEmpty && showBackdrop} />
            <ContentsWrapper>
              <GeoCharts />
              {flags.selected ? (
                <ResultSelected selected={flags.selected} />
              ) : null}
              {isSuppliersNotEmpty && (
                <Filters totalCount={stats?.count || count} />
              )}
              {isSuppliersNotEmpty && !flags.selected && <Summary />}

              <div
                style={{
                  padding: "12px",
                  width: "100%",
                  margin: "8px",
                  display: "flex",
                  // justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {suppliers?.length > 0 ? (
                  <div>
                    <FilterButton
                      onClick={() => {
                        setFilterModalVisible(true);
                        setSurveyOn(true);
                      }}
                    >
                      {t("scout.buildMyShortlist", "Build my Shortlist")}
                    </FilterButton>
                    {surveyOn ? (
                      <Survicate loadSurvey={surveyOn} onClose={() => {}} />
                    ) : null}
                  </div>
                ) : null}
              </div>

              <ResultTable />
            </ContentsWrapper>
          </ContentsContainer>
        </MainContainer>
      )}
      <Feedback />
    </ScoutContainer>
  );
}

const LoadingAnimationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const FilterButton = styled.button`
  width: 180px;
  min-width: 120px;
  height: 46px;
  border: none;
  border-radius: 32px;
  background: #006d75;
  cursor: pointer;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  color: #f5f5f5;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
  &:hover {
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.08));
  }
  &:active {
    background: #006d75;
  }
`;

const CarouselLeft = () => (
  <svg
    width="72"
    height="72"
    style={{ zIndex: 10000, cursor: "pointer" }}
    viewBox="0 0 72 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_429_98021)">
      <g filter="url(#filter0_dd_429_98021)">
        <path
          d="M36 66C19.4314 66 6 52.5686 6 36C6 19.4315 19.4314 6 36 6C52.5685 6 66 19.4315 66 36C66 52.5686 52.5685 66 36 66Z"
          fill="white"
        />
        <path
          d="M36 66C19.4314 66 6 52.5686 6 36C6 19.4315 19.4314 6 36 6C52.5685 6 66 19.4315 66 36C66 52.5686 52.5685 66 36 66Z"
          stroke="#08979C"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </g>
      <path
        d="M40.5 49.5L27 36L40.5 22.5"
        stroke="#08979C"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_429_98021"
        x="1"
        y="3"
        width="70"
        height="72"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_429_98021"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_429_98021"
          result="effect2_dropShadow_429_98021"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_429_98021"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_429_98021">
        <rect
          width="72"
          height="72"
          fill="white"
          transform="matrix(-1 0 0 1 72 0)"
        />
      </clipPath>
    </defs>
  </svg>
);

const CarouselRight = () => (
  <svg
    width="72"
    height="72"
    viewBox="0 0 72 72"
    style={{ zIndex: 10000, cursor: "pointer" }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_429_98024)">
      <g filter="url(#filter0_dd_429_98024)">
        <path
          d="M36 66C52.5686 66 66 52.5686 66 36C66 19.4315 52.5686 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5686 19.4315 66 36 66Z"
          fill="white"
        />
        <path
          d="M36 66C52.5686 66 66 52.5686 66 36C66 19.4315 52.5686 6 36 6C19.4315 6 6 19.4315 6 36C6 52.5686 19.4315 66 36 66Z"
          stroke="#08979C"
          stroke-width="2"
          stroke-linejoin="round"
        />
      </g>
      <path
        d="M31.5 49.5L45 36L31.5 22.5"
        stroke="#08979C"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_429_98024"
        x="1"
        y="3"
        width="70"
        height="72"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_429_98024"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_429_98024"
          result="effect2_dropShadow_429_98024"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_429_98024"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_429_98024">
        <rect width="72" height="72" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 22px;
  display: flex;
  align-items: flex-end;
  color: #445b66;
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
`;
const ScoutContainer = styled.div`
  width: 100%;
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
  align-items: ${(props) => (props.isrow ? "end" : "center")};
  margin-bottom: 50px;
  flex-direction: ${(props) => (props.isrow ? "row" : "column")};
  gap: 15px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    flex-direction: column;
  }
`;

const IconContainer = styled.div<{ isrow: boolean }>`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: "center";
  align-items: end;
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
  font-family: "Ubuntu";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #89a8b3;
  white-space: nowrap;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedBackButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const SelectedBackButton = styled.div`
  padding: 5px 40px;
  color: #666;
  font-weight: bold;
  cursor: pointer;

  > span {
    font-size: 25px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -6px;
  }
`;
