"use client";

import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import _, { capitalize } from "lodash";

import { useQuickBridgeSupplier } from "requests/useScoutByScoutBridge";
import useBoundStore from "hooks/useBoundStore";
import { useViewport } from "hooks/useViewport";
import UnlockBackDrop from "../UnlockBackDrop";
import LockedResultCard from "../LockedResultCard";
import { Breadcrumbs, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";

const ResultCard = dynamic(() => import("components/scout/ResultCard"));
const ScoutFilter = dynamic(() => import("components/scout/ScoutFilter"));

import { SearchBarForFilter } from "components/scout/SearchBar";
import { GoBackIcon } from "components/Button";
import { theme } from "config/theme";
import useStore from "hooks/useStore";
import { QuickBridgeTabType } from "utils/constants";

export default function QuickbridgeResult() {
  const quickBridge = useBoundStore((state) => state.quickBridge);
  const {
    suppliers,
    page,
    setPage,
    count,
    filter,
    setResult,
    setPageSize,
    selectedLabel,
    setSelectedLabel,
    setTab,
    tab,
  } = quickBridge;
  const { scrollOffset } = useViewport();
  const { searchSuppliers, searchSuppliersThreeP, resetAllSelected, loading } =
    useQuickBridgeSupplier();

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const clearRef = useRef(false);
  const pageLoaded = useRef(false);
  const [isLocked, setIsLocked] = useState(false);
  const router = useRouter();

  const { filterData, setFilterData, clearFilterData } = useStore();

  useEffect(() => {
    getInitialRequests();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (clearRef.current) {
      searchHandler();
      clearRef.current = false;
    }
  }, [filter]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  /*
  const getInitialRequests = () => {
    if (
      filter?.servicesType == "Logistics" ||
      filter?.servicesType == "Engineering" ||
      filter?.servicesType == "Quality" ||
      tab?.activeTab == 7
    ) {
      searchSuppliersThreeP(1, false, "");
    } else {
      if (!pageLoaded.current) {
        pageLoaded.current = true;
        searchSuppliers(1, true);
      }
    }
  };
  */
  const getInitialRequests = () => {
    if (!pageLoaded.current) {
      pageLoaded.current = true;
      searchSuppliers(1, true);
    }
  };

  /*
  const searchSupplierHandler = async () => {
    const currentPage = pageRef.current;
    if (
      filter?.servicesType == "Logistics" ||
      filter?.servicesType == "Engineering" ||
      filter?.servicesType == "Quality" ||
      tab?.activeTab == 7
    ) {
      await searchSuppliersThreeP(currentPage + 1, false, "");
    } else {
      if (currentPage * 10 < countRef.current) {
        await searchSuppliers(currentPage + 1, false, "");
        pageRef.current = currentPage + 1;
        infiniteScrollControl.current = true;
      }
    }
  };
  */

  const searchSupplierHandler = async () => {
    const currentPage = pageRef.current;

    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1, false, "");
      pageRef.current = currentPage + 1;
      infiniteScrollControl.current = true;
    }
  };

  const handleScroll = async () => {
    var isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom && infiniteScrollControl.current && suppliers?.length < 20) {
      infiniteScrollControl.current = false;
      setPage(page + 1);
      await searchSupplierHandler();
    }
  };

  const searchHandler = async () => {
    pageRef.current = 1;
    await searchSuppliers(1, true, filterData.q);
    infiniteScrollControl.current = true;
  };

  const setTabResult = () => {
    resetAllSelected();
    clearFilters();
    setResult(false);
    setSelectedLabel("");
  };

  const clearFilters = () => {
    filterData.q = "";
    clearFilterData();
  };

  const handleClickLink = (index: number) => {
    switch (index) {
      case 1:
        clearFilters();
        setTab(0, QuickBridgeTabType.vehile);
      case 2:
        setSelectedLabel("");
        resetAllSelected();
      case 3:
        break;
    }
    setResult(false);
  };
  var breadcrumbs: any = [];
  if (tab && tab.tabLabel) {
    breadcrumbs.push(
      <Link
        underline="hover"
        key={1}
        href={"#"}
        style={{ color: "#00000096" }}
        onClick={() => handleClickLink(1)}
      >
        {"Quickbridge"}
      </Link>
    );
    breadcrumbs.push(
      <Link
        underline="hover"
        key={2}
        href={"#"}
        style={{ color: selectedLabel ? "#00000096" : "#000000C7" }}
        onClick={() => handleClickLink(2)}
      >
        {tab.tabLabel}
      </Link>
    );
  }

  if (selectedLabel) {
    breadcrumbs.push(
      <Link
        underline="hover"
        key={3}
        href={"#"}
        style={{ color: "#000000C7" }}
        onClick={() => handleClickLink(3)}
      >
        {selectedLabel}
      </Link>
    );
  }

  const isSuppliersNotEmpty: boolean =
    suppliers?.length > 0 && Object.keys(suppliers[0]).length > 0;

  let searchPlaceholder = "Search";
  if (selectedLabel != "") {
    searchPlaceholder += " in " + selectedLabel;
  }
  // console.log("filterData: ", filterData);

  return (
    <ScoutContainer>
      <BreadcrumbsContainer>
        <Stack spacing={2}>
          <Breadcrumbs separator=">" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </BreadcrumbsContainer>
      <MainContainer>
        <GoBackIcon goBack={setTabResult}></GoBackIcon>
        <SearchContainer>
          <SearchBarForFilter
            onSearch={searchHandler}
            placeholder={searchPlaceholder}
          />
        </SearchContainer>
        <FilterContainer>
          <ScoutFilter isQuickSearch={true} />
        </FilterContainer>
        <QuickbridgeContainer>
          <ResultContainer>
            {isSuppliersNotEmpty ? (
              <>
                {suppliers.map((supplier: any, index: number) =>
                  index > 20 ? null : index == 20 ||
                    index == suppliers.length ? (
                    <LockedContainer key={`locked-container-${index}`}>
                      <LockedResultCard
                        data={supplier}
                        key={`${supplier.id}_${index}`}
                      />
                      <UnlockBackDrop isOpen={true} />
                    </LockedContainer>
                  ) : (
                    <ResultCard
                      data={supplier}
                      key={`${supplier.id}_${index}`}
                    />
                  )
                )}
              </>
            ) : null}
            {loading &&
              [1, 2, 3, 4].map((index) => (
                <ResultCard key={`loading-${index}`} />
              ))}
          </ResultContainer>
        </QuickbridgeContainer>
      </MainContainer>

      {/* <UnlockBackDrop isOpen={true} /> */}
    </ScoutContainer>
  );
}

const ScoutContainer = styled.div`
  // width: 1440px;
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

const BreadcrumbsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: absolute;
  top: 103px;
`;

const MainContainer = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const QuickbridgeContainer = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 22px;
        @media (max-width: ${(props) => props.theme.size.laptop}) {
          margin - left: 0;
  }
        `;

const ResultContainer = styled.div``;

const Button = styled.div`
        width: 254px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px !important;
        background-color: #08979c;
        color: #f5f5f5;
        margin-bottom: 8px;
        border: 1px solid #08979c;
        padding: 12px;
        cursor: pointer;

        font-family: "Inter", sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;

        &:hover {
          box - shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
        0px 9px 28px 8px rgba(0, 0, 0, 0.05);
        filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.08));
  }
        &:active {
          background - color: #006d75;
  }
        `;

const LockedContainer = styled.div`
  position: relative !important;
`;
const SearchContainer = styled.div`
  width: 40%;
  @media (min-width: ${theme.dimension.cardMaxWidth}) {
    width: ${theme.dimension.cardMaxWidth};
  }
  margin: 25px 0px 0px 0px;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 15px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    justify-content: space-between;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    flex-direction: column;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 2% -6% -2% 0%;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    width: 100%;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    flex-direction: column;
    gap: 30px;
  }
`;
