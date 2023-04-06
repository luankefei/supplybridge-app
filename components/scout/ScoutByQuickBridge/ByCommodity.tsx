"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeCommodity } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";

export default function ByCommodity() {
  const { quickBridgeStore, commodityStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    commodityStore: state.quickBridgeCommodities,
  }));
  const { setFilter, setSelectedLabel, setSuppliers, suppliers } =
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

      if (!data || !Array.isArray(data)) return;
      const item = data.find((item) => item.id === select);
      if (!item || !item.id) return;
      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.commodity}/${item.name}`
      );
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("commodities", null);

      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.commodity}`
      );
    }
  };

  useEffect(() => {
    if (!data) {
      getCommodities();
    }
  }, [data, getCommodities]);

  useEffect(() => {
    setFilter("commodities", null);
  }, []);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    if (
      router.query &&
      router.query.slug &&
      Array.isArray(router.query.slug) &&
      router.query.slug.length > 0
    ) {
      if (router.query.slug.length > 2) {
        var slug = "";
        if (router.query.slug.length > 3) {
          slug = `${router.query.slug[2]}/${router.query.slug[3]}`;
        } else {
          slug = router.query.slug[2];
        }
        const item = data.find(
          (item) => item.name.toLowerCase() === slug.toLowerCase()
        );
        if (item && item.id) {
          setSelected(item.id);
          setFilter("commodities", item.id);
        } else {
          setSelected(null);
          setFilter("commodities", null);
        }
      }
    }
  }, [data]);

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
