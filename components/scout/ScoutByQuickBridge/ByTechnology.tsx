"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeTechnology } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";

export default function ByTechnology() {
  const { quickBridgeStore, technologyStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    technologyStore: state.quickBridgeTechnologies,
  }));
  const { setFilter, setSelectedLabel } = quickBridgeStore;
  const { selected, setSelected, data } = technologyStore;
  const { getTechnologies, loading } = useQuickBridgeTechnology();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
      setFilter("vehicleFuelTypes", select);

      if (!data || !Array.isArray(data)) return;
      const item = data.find((item) => item.id === select);
      if (!item || !item.id) return;
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("vehicleFuelTypes", null);
    }
  };

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
  grid-template-columns: auto auto;
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
