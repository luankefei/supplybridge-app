"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";
import { useQuickBridgeService } from "requests/useScoutByScoutBridge";

export default function ServicesP() {
  const { quickBridgeStore, services } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    services: state.quickBridgeService,
  }));
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
  const { selected, setSelected, data } = services;
  const { getServices3P, loading } = useQuickBridgeService();
  const router = useRouter();

  const onClick = (select: any) => {
    if (select !== selected) {
      setSelected(select);
      setFilter("servicesType", select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
      setFilter("servicesType", label);
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("servicesType", null);
    }
  };

  useEffect(() => {
    if (!data) {
      getServices3P();
      return;
    }
  }, [data, getServices3P, setSelected, setFilter]);

  /*
  useEffect(() => {
    setFilter("servicesType", null);
  }, []);
  */

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 7) {
      setFilter("servicesType", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

  if (loading) {
    return (
      <Container>
        <CardContainer>
          {[1, 2, 3, 4].map((index) => (
            <CardWrapper key={index}>
              <BigCardSkeleton />
            </CardWrapper>
          ))}
        </CardContainer>
      </Container>
    );
  }

  return (
    <Container>
      <CardContainer>
        {data &&
          data.map(({ id, name, icon }: any) => (
            <CardWrapper onClick={() => onClick(id)} key={id}>
              <BigCard src={icon} title={name} selected={selected === id} />
            </CardWrapper>
          ))}
      </CardContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 24px;
`;

const Text = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #4b5563;
  text-align: center;
  margin-bottom: 18px;
`;

const CardWrapper = styled.span`
  cursor: pointer;
`;

/*
import { useEffect, useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByTechnology() {
  const [selected, setSelected] = useState<any>("")

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select)
    } else {
      setSelected("")
    }
  }


  return (
    <Container>
      <CardContainer>
        <CardWrapper onClick={() => onClick("ice")}>
          <BigCard src={"ice"} title={"ICE"} selected={selected === "ice"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("ev")}>
          <BigCard src={"ev"} title={"EV"} selected={selected === "ev"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("fuelcell")}>
          <BigCard src={"fuelcell"} title={"Fuel Cell"} selected={selected === "fuelcell"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("autonomous")}>
          <BigCard src={"autonomous"} title={"Autonomous"} selected={selected === "autonomous"} />
        </CardWrapper>
      </CardContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 24px;
`;

const Text = styled.span`
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 20px;
color: #4B5563;
text-align: center;
margin-bottom: 18px;
`

const CardWrapper = styled.span`
cursor: pointer;
`;
*/
