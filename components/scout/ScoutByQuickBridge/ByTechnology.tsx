"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeTechnology } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';

const nameKeyMap: any = {
   "Autonomous": "scout.quickbridge.autonomous",
   "Electric Vehicle (EV)": "scout.quickbridge.electricVehicle",
   "Fuel Cell": "scout.quickbridge.fuelCell",
   "ICE": "scout.quickbridge.ice",
};

export default function ByTechnology() {
  const { t } = useTranslation();
  const { quickBridgeStore, technologyStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    technologyStore: state.quickBridgeTechnologies,
  }));
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
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

  useEffect(() => {
    if (!data) {
      getTechnologies();
    }
  }, [data, getTechnologies]);

  /*
  useEffect(() => {
    setFilter("vehicleFuelTypes", null);
  }, []);
  */

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 4) {
      setFilter("vehicleFuelTypes", null);
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
              <BigCard src={icon} title={t(nameKeyMap[name], name)} selected={selected === id} />
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
