"use client"

import { useEffect, useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeCommodity } from "requests/useScoutByScoutBridge"

export default function ByCommodity() {
  const { quickBridgeStore, commodityStore } =
    useBoundStore((state) => ({
      quickBridgeStore: state.quickBridge,
      commodityStore: state.quickBridgeCommodities
    }));
  const { setFilter, setSuppliers, suppliers } = quickBridgeStore;
  const { selected, setSelected, data } = commodityStore;
  const { getCommodities, loading } = useQuickBridgeCommodity();
  const onClick = (select: any) => {
    console.log("selected", select)
    if (selected !== select) {
      setSelected(select);
      setFilter("commodities", select);
    } else {
      setSelected(null);
    }
  }


  useEffect(() => {
    if (!data) {
      getCommodities();
    }
  }, [data, getCommodities])

  if (loading) {
    return (
      <CardContainer>
        {[1, 2, 3, 4].map((index) => (
          <CardWrapper key={index}>
            <BigCardSkeleton />
          </CardWrapper>
        ))}
      </CardContainer>
    );
  }
  console.log("commodity data", data)
  return (
    <CardContainer>
      {data && data.map(({ id, name, icon }: any) => (
        <CardWrapper onClick={() => onClick(id)} key={id}>
          <BigCard src={icon} title={name} selected={selected === id} />
        </CardWrapper>
      ))}
    </CardContainer>
  )
}


const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 24px;
  margin-top: 86px;
  margin-bottom: 86px;
`;

const CardWrapper = styled.span`
  cursor: pointer;
`;
