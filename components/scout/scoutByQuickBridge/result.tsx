"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Breadcrumbs, Link } from "@mui/material";
import { Stack } from "@mui/system";
import { GridPaginationModel } from "@mui/x-data-grid";

import { arrayToString } from "utils/array";
import { TSupplierModel } from "models/supplier";
import { useQuickBridgeSupplier } from "requests/useScoutByScoutBridge";
import useBoundStore from "hooks/useBoundStore";
import { GoBackIcon } from "components/button";
import { LoadingWithBackgroundOverlay } from "components/ui-components/loadingAnimation";
import { useStore } from "hooks/useStore";
import ScoutResult from "../scoutResult";
import EmptyResult from "../scoutByIndex/emptyResult";
import { QuickBridgeTabType } from "../types";
import { SupplierModal } from "../supplierModal";

interface IBreadcrumb {
  label: string
  id: number
  color: string
}

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
  const { searchSuppliers, resetAllSelected, loading } = useQuickBridgeSupplier();

  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const clearRef = useRef(false);
  const pageLoaded = useRef(false);

  const { filterData, clearFilterData } = useStore();

  const [selectedItem, setSelectedItem] = useState<TSupplierModel | null>(null);

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

  // const handleScroll = useCallback(async () => {
  //   var isAtBottom =
  //     document.documentElement.scrollHeight -
  //       document.documentElement.scrollTop <=
  //     document.documentElement.clientHeight;

  //   if (isAtBottom && infiniteScrollControl.current && suppliers?.length < 20) {
  //     infiniteScrollControl.current = false;
  //     setPage(page + 1);
  //     await searchSupplierHandler();
  //   }
  // }, [page, searchSupplierHandler, setPage, suppliers?.length]);

  const clearFilters = useCallback(() => {
    filterData.q = "";
    clearFilterData();
  }, [clearFilterData, filterData]);

  const searchHandler = useCallback(async () => {
    pageRef.current = 1;
    await searchSuppliers(page, true, filterData.q);
    infiniteScrollControl.current = true;
  }, [filterData.q, page, searchSuppliers]);

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

  // TODO: Do we still need infinite loading by scrolling?
  // useEffect(() => {
  //   getInitialRequests();
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [getInitialRequests, handleScroll]);

  useEffect(() => {
    getInitialRequests();
  }, [getInitialRequests])

  const onPaginationModelChange = useCallback(({ page, pageSize }: GridPaginationModel) => {
    setPage(page + 1)
    setPageSize(pageSize)
    searchSuppliers(page + 1, true, "");
  }, [searchSuppliers, setPage, setPageSize]);

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

  const onViewDetail = useCallback((_sid: number) => {
    const supplier: TSupplierModel | undefined = suppliers.find((s) => s.id === _sid);

    setSelectedItem(supplier ?? null);
  }, [suppliers]);

  return (
    <ScoutContainer>
      {loading && (
        <LoadingWithBackgroundOverlay />
      )}
      <BreadcrumbsContainer>
        <GoBackIcon goBack={setTabResult}></GoBackIcon>
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
      </BreadcrumbsContainer>
      <MainContainer>
        {!loading && !suppliers.length && <EmptyResult />}
        <ScoutResult
          suppliers={suppliers}
          pageMeta={{
            stats: { count },
            page: page - 1,
            pageSize: pageSize,
          }}
          queryString=""
          onSearch={onPaginationModelChange}
          onViewDetail={onViewDetail}
        />
      </MainContainer>
      <SupplierModal
        open={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        data={selectedItem}
      />
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
  align-items: center;
  padding: 0 24px;
  gap: 16px;

  nav {
    ol {
      li {
        a {
          color: #9CA3AF !important;
        }

        &:last-of-type {
          a {
            color: #434343 !important;
          }
        }
      }
    }
  }
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
