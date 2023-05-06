"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeCommodity } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";

export default function ByCommodity() {
  const { quickBridgeStore, commodityStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    commodityStore: state.quickBridgeCommodities,
  }));
  const { setFilter, setSelectedLabel, setSuppliers, suppliers, tab } =
    quickBridgeStore;
  const { selected, setSelected, data } = commodityStore;
  const { getCommodities, loading } = useQuickBridgeCommodity();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
      setSelected(select);
      setFilter("commodities", select);
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("commodities", null);
    }
  };

  useEffect(() => {
    if (!data) {
      getCommodities();
    }
  }, [data, getCommodities]);

  /*
  useEffect(() => {
    setFilter("commodities", null);
  }, []);
  */

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 5) {
      setFilter("commodities", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

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
  return (
    <CardContainer>
      {data &&
        data.map(({ id, name, icon }: any) => (
          <CardWrapper onClick={() => onClick(id)} key={id}>
            <BigCard src={icon} title={name} selected={selected === id} />
          </CardWrapper>
        ))}
    </CardContainer>
  );
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
