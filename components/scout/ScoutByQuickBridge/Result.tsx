"use client"

import styled from "styled-components";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";

import { useQuickBridgeSupplier } from "requests/useScoutByScoutBridge";
import useBoundStore from "hooks/useBoundStore";
import { useViewport } from "hooks/useViewport";
import UnlockBackDrop from '../UnlockBackDrop'
import LockedResultCard from "../LockedResultCard";
const ResultCard = dynamic(() => import("components/scout/ResultCard"));

export default function QuickbridgeResult() {
  const quickBridge = useBoundStore((state) => state.quickBridge);

  const { suppliers, page, setPage, count, filter, setResult, setPageSize } = quickBridge;
  const { scrollOffset } = useViewport();
  const { searchSuppliers, resetAllSelected, loading } = useQuickBridgeSupplier();
  const infiniteScrollControl = useRef(true);
  const countRef = useRef(count);
  const pageRef = useRef(1);
  const clearRef = useRef(false);
  const pageLoaded = useRef(false);
  const [isLocked, setIsLocked] = useState(false);

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

  const getInitialRequests = () => {
    if (!pageLoaded.current) {
      pageLoaded.current = true;
      searchSuppliers(1, true);
    }
  };

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

  const searchHandler = () => {
    pageRef.current = 1;
    searchSuppliers(1, true);
    infiniteScrollControl.current = true;
  };

  const setTabResult = () => {
    resetAllSelected();
    setResult(false);
  }

  const isSuppliersNotEmpty: boolean =
    suppliers?.length > 0 && Object.keys(suppliers[0]).length > 0;

  return (
    <ScoutContainer>
      <MainContainer>
        <Button
          onClick={setTabResult}
        >Back</Button>
        <QuickbridgeContainer>
          <ResultContainer>
            {isSuppliersNotEmpty ? (
              <>
                {suppliers.map((supplier: any, index: number) => (
                  index > 20 ? null :
                    index == 20 || index + 1 == suppliers.length ?
                      <LockedContainer key={`locked-container-${index}`}>
                        <LockedResultCard data={supplier} key={`${supplier.id}_${index}`} />
                        <UnlockBackDrop isOpen={true} />
                      </LockedContainer>
                      :
                      <ResultCard data={supplier} key={`${supplier.id}_${index}`} />
                )
                )}
              </>
            ) : null}
            {loading && [1, 2, 3, 4].map((index) => (<ResultCard key={`loading-${index}`} />))}
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
    margin-left: 0;
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
    box-shadow: 0px 3px 6px -4px rgba(0, 0, 0, 0.12),
      0px 9px 28px 8px rgba(0, 0, 0, 0.05);
    filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.08));
  }
  &:active {
    background-color: #006d75;
  }
`;


const LockedContainer = styled.div`
     position: relative !important;
`