"use client"

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeProductionTechnology } from "requests/useScoutByScoutBridge"
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";

export default function ByProductionTech() {
  const { quickBridgeStore, productionTechnologyStore } =
    useBoundStore((state) => ({
      quickBridgeStore: state.quickBridge,
      productionTechnologyStore: state.quickBridgeProductionTechnologies
    }));
  const { setFilter } = quickBridgeStore;
  const { selected, setSelected, data } = productionTechnologyStore;
  const { getProductionTechnologies, loading } = useQuickBridgeProductionTechnology();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      setFilter("productionTechnologies", select);

      if (!data || !Array.isArray(data)) return;
      const item = data.find((item) => item.id === select);
      if (!item || !item.id) return;
      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.productionTech}/${item.name}`
      );
    } else {
      setSelected(null);
      setFilter("productionTechnologies", null);
      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.productionTech}`
      );
    }
  }

  useEffect(() => {
    if (!data) {
      getProductionTechnologies();
    }
  }, [data, getProductionTechnologies])

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    if (router.query && router.query.slug && Array.isArray(router.query.slug) && router.query.slug.length > 0) {
      if (router.query.slug.length > 2 && router.query.slug[2]) {
        const slug = router.query.slug[2];
        const item = data.find((item) => item.name.toLowerCase() === slug.toLowerCase());
        if (item && item.id) {
          setSelected(item.id);
          setFilter("productionTechnologies", item.id);
        } else {
          setSelected(null);
          setFilter("productionTechnologies", null);
        }
      }
    }
  }, [data]);

  if (loading) {
    return (
      <CardContainer>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <CardWrapper key={index}>
            <BigCardSkeleton />
          </CardWrapper>
        ))}
      </CardContainer>
    );
  }

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

/*
import { useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByProductionTech() {
  const [selected, setSelected] = useState("")


  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select)
    } else {
      setSelected("")
    }
  }


  return (
    <>
      <CardContainer>
        <CardWrapper onClick={() => onClick("injection-molding")}>
          <BigCard src={"injection-molding"} title={"Injection Molding"} selected={selected === "injection-molding"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("forging")}>
          <BigCard src={"forging"} title={"Forging"} selected={selected === "forging"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("casting")}>
          <BigCard src={"casting"} title={"Casting"} selected={selected === "casting"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("stamping")}>
          <BigCard src={"stamping"} title={"Stamping"} selected={selected === "stamping"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("composite-part")}>
          <BigCard src={"composite-part"} title={"Composite Part"} selected={selected === "composite-part"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("structural-part")}>
          <BigCard src={"structural-part"} title={"Structural Part"} selected={selected === "structural-part"} />
        </CardWrapper>
      </CardContainer>
    </>
  )
}


const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 24px;
`;

const CardWrapper = styled.span`
cursor: pointer;
`;
*/