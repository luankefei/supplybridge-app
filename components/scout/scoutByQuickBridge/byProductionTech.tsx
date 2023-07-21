"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./bigCard";
import BigCardSkeleton from "./bigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import _ from "lodash";
import { useQuickBridgeProductionTechnology } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const nameKeyMap: any = {
  "Injection Molding": "scout.quickbridge.injectionModling",
  Forging: "scout.quickbridge.forging",
  Casting: "scout.quickbridge.casting",
  Stamping: "scout.quickbridge.stamping",
  "Composite Part": "scout.quickbridge.compositePart",
  "Structural Part": "scout.quickbridge.structuralPart",
  "Additive Manufacturing": "scout.quickbridge.additiveManufacturing",
  "CNC Machining": "scout.quickbridge.cncMachining",
  "Tooling & Fixtures": "scout.quickbridge.toolingFixtures",
  Others: "scout.quickbridge.others",
};

export default function ByProductionTech() {
  const { t } = useTranslation();
  const { quickBridgeStore, productionTechnologyStore } = useBoundStore(
    (state) => ({
      quickBridgeStore: state.quickBridge,
      productionTechnologyStore: state.quickBridgeProductionTechnologies,
    })
  );
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
  const { selected, setSelected, data } = productionTechnologyStore;
  const { getProductionTechnologies, loading } =
    useQuickBridgeProductionTechnology();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
      setFilter("productionTechnologies", select);
    } else {
      setSelected(null);
      setFilter("productionTechnologies", null);
      setSelectedLabel("");
    }
  };

  useEffect(() => {
    if (!data) {
      getProductionTechnologies();
    }
  }, [data, getProductionTechnologies]);

  /*
  useEffect(() => {
    setFilter("productionTechnologies", null);
  }, []);
  */

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 6) {
      setFilter("productionTechnologies", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

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

  const InfoContent = (description: any) => {
    const items = _.split(description, "\n");
    if (items && Array.isArray(items) && items.length > 1) {
      return items.map((item: any) => <div key={item}>{item}</div>);
    }
    return <div>{description}</div>;
  };

  return (
    <CardContainer>
      {data &&
        data.map(({ id, name, icon, description, isActive }: any) =>
          description ? (
            <CardWrapper onClick={() => onClick(id)} key={id}>
              <BigCard
                src={icon}
                title={t(nameKeyMap[name], name)}
                selected={selected === id}
                infoContent={InfoContent(
                  t(`${nameKeyMap[name]}Desc`, description)
                )}
                disabled={!isActive}
              />
            </CardWrapper>
          ) : (
            <CardWrapper onClick={() => onClick(id)} key={id}>
              <BigCard
                src={icon}
                title={t(nameKeyMap[name], name)}
                selected={selected === id}
                disabled={!isActive}
              />
            </CardWrapper>
          )
        )}
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
