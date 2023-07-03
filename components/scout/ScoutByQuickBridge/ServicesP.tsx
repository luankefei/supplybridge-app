"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";
import { useQuickBridgeService } from "requests/useScoutByScoutBridge";
import _ from "lodash";
import { useTranslation } from 'react-i18next';

const nameKeyMap: any = {
   "Engineering": "scout.quickbridge.engineering",
   "Quality": "scout.quickbridge.quality",
   "Logistics": "scout.quickbridge.logistics",
};

export default function ServicesP() {
  const { t } = useTranslation();
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
      setFilter("offerings", select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("offerings", null);
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
      setFilter("offerings", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

  if (loading) {
    return (
      <Container>
        <CardContainer>
          {[1, 2, 3].map((index) => (
            <CardWrapper key={index}>
              <BigCardSkeleton />
            </CardWrapper>
          ))}
        </CardContainer>
      </Container>
    );
  }

  const InfoContent = (description: any) => {
    const items = _.split(description, "\n");
    if (items && Array.isArray(items) && items.length > 1) {
      return items.map((item: any) => <div key={item}>{item}</div>);
    }
    return <div>{description}</div>;
  };

  return (
    <Container>
      <CardContainer>
        {data &&
          data
            .sort((a: any, b: any) => a.id - b.id)
            .map(({ id, name, icon, description }: any) => (
              <CardWrapper onClick={() => onClick(id)} key={id}>
                <BigCard
                  src={icon}
                  title={t(nameKeyMap[name], name)}
                  selected={selected === id}
                  infoContent={InfoContent(t(`${nameKeyMap[name]}Desc`, description))}
                />
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
