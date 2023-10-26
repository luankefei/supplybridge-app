"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Breadcrumbs, Link } from "@mui/material";
import { Stack } from "@mui/system";


import { useQuickBridgeSupplier } from "requests/useScoutByScoutBridge";
import useBoundStore from "hooks/useBoundStore";
import { GoBackIcon } from "components/button";
import LoadingAnimation from "components/ui-components/loadingAnimation";
import { useStore } from "hooks/useStore";
import { QuickBridgeTabType } from "../types";
import ScoutResult from "../scoutResult";

interface IBreadcrumb {
  label: string
  id: number
  color: string
}

const randomDuration = () => {
  let r = Math.floor(Math.random() * 10); // 0 ~ 9
  // console.log("animation r: ", r);
  return r == 0 || r == 1 ? "long" : "short"; // 1/5 odd is long, 4/5 odd is short
  // return "long";
};

export default function QuickBridgeResult() {
  const quickBridge = useBoundStore((state) => state.quickBridge);
  const {
    suppliers,
    page,
    pageSize,
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
  const { searchSuppliers, resetAllSelected, loading } =
    useQuickBridgeSupplier();

  const [loadingAnimations, setLoadingAnimations] = useState(true);

  const [aniDuration, setAniDuration] = useState(randomDuration());

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const clearRef = useRef(false);
  const pageLoaded = useRef(false);

  const { filterData, clearFilterData } = useStore();

  useEffect(() => {
    setTimeout(
      () => {
        setLoadingAnimations(false);
      },
      aniDuration == "short" ? 3200 : 6200
    );
  }, [aniDuration]);

  useEffect(() => {
    countRef.current = count;
  }, [count]);


  const getInitialRequests = useCallback(() => {
    if (!pageLoaded.current) {
      pageLoaded.current = true;
      searchSuppliers(1, true);
    }
  }, [searchSuppliers]);


  const searchSupplierHandler = useCallback(async () => {
    const currentPage = pageRef.current;

    if (currentPage * 10 < countRef.current) {
      await searchSuppliers(currentPage + 1, false, "");
      pageRef.current = currentPage + 1;
      infiniteScrollControl.current = true;
    }
  }, [searchSuppliers]);

  const handleScroll = useCallback(async () => {
    var isAtBottom =
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight;

    if (isAtBottom && infiniteScrollControl.current && suppliers?.length < 20) {
      infiniteScrollControl.current = false;
      setPage(page + 1);
      await searchSupplierHandler();
    }
  }, [page, searchSupplierHandler, setPage, suppliers?.length]);

  const clearFilters = useCallback(() => {
    filterData.q = "";
    clearFilterData();
  }, [clearFilterData, filterData]);

  const searchHandler = useCallback(async () => {
    pageRef.current = 1;
    await searchSuppliers(1, true, filterData.q);
    infiniteScrollControl.current = true;
  }, [filterData.q, searchSuppliers]);

  const setTabResult = useCallback(() => {
    resetAllSelected();
    clearFilters();
    setResult(false);
    setSelectedLabel("");
  }, [clearFilters, resetAllSelected, setResult, setSelectedLabel]);

  const handleClickLink = useCallback((index: number) => {
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
  }, [clearFilters, resetAllSelected, setResult, setSelectedLabel, setTab]);

  useEffect(() => {
    if (clearRef.current) {
      searchHandler();
      clearRef.current = false;
    }
  }, [filter, searchHandler]);

  useEffect(() => {
    getInitialRequests();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [getInitialRequests, handleScroll]);

  const breadcrumbs: IBreadcrumb[] = useMemo(() => {
    const _breadcrumbs: IBreadcrumb[] = [];
    if (tab && tab.tabLabel) {
      _breadcrumbs.push({ label: 'Quickbridge', id: 1, color: '#00000096' });
      _breadcrumbs.push({ label: tab.tabLabel, id: 2, color: selectedLabel ? "#00000096" : "#000000C7" });
    }

    if (selectedLabel) {
      _breadcrumbs.push({ label: selectedLabel, id: 3, color: '#000000C7' });
    }

    return _breadcrumbs;
  }, [selectedLabel, tab]);


  return (
    <ScoutContainer>
      {loadingAnimations ? (
        <LoadingAnimationContainer>
          <LoadingAnimation showType={aniDuration} />
        </LoadingAnimationContainer>
      ) : (
        <>
          <BreadcrumbsContainer>
            <Stack spacing={2}>
              <Breadcrumbs separator=">" aria-label="breadcrumb">
                {breadcrumbs.map((b) => (
                  <Link
                    key={b.id}
                    underline="hover"
                    href="#"
                    style={{ color: b.color }}
                    onClick={() => handleClickLink(b.id)}
                  >
                    {b.label}
                  </Link>
                ))}
              </Breadcrumbs>
            </Stack>
          </BreadcrumbsContainer>
          <MainContainer>
            <GoBackIcon goBack={setTabResult}></GoBackIcon>
            {/* <ScoutResult
              suppliers={suppliers}
              pageMeta={{
                stats: { count },
                page,
                pageSize,
              }}
              queryString="TODO"
              onSearch={() => null}
            /> */}
          </MainContainer>
        </>
      )}
      
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

const LoadingAnimationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
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
