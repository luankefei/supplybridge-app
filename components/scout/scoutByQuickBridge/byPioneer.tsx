"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./bigCard";
import BigCardSkeleton from "./bigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgePioneer } from "requests/useScoutByScoutBridge";
import _ from "lodash";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const nameKeyMap: any = {
  Startups: "scout.quickbridge.startups",
  Innovations: "scout.quickbridge.innovations",
  "Diversity, Equity, and Inclusion (DEI)": "scout.quickbridge.dei",
  Recyclers: "scout.quickbridge.recyclers",
  "Sustainable Production": "scout.quickbridge.sustainableProduction",
  "Low Volume": "scout.quickbridge.lowVolume",
};

export default function ByPioneer() {
  const { t } = useTranslation();
  const { quickBridgeStore, pioneerStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    pioneerStore: state.quickBridgePioneers,
  }));
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
  const { selected, setSelected, data } = pioneerStore;
  const { getPioneers, loading } = useQuickBridgePioneer();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
      setFilter("pioneers", select);
    } else {
      setSelected(null);
      setFilter("pioneers", select);
      setSelectedLabel("");
    }
  };

  useEffect(() => {
    if (!data) {
      getPioneers();
    }
  }, [data, getPioneers]);

  /*
  useEffect(() => {
    setFilter("pioneers", null);
  }, []);
  */

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 8) {
      setFilter("pioneers", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

  if (loading) {
    return (
      <CardContainer>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <CardWrapper key={index} disabled={false}>
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
            <CardWrapper
              onClick={() => onClick(id)}
              key={id}
              disabled={!isActive}
            >
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
            <CardWrapper
              onClick={() => onClick(id)}
              key={id}
              disabled={!isActive}
            >
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

const CardWrapper = styled.span<{ disabled: boolean }>`
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  filter: ${(props) => (props.disabled ? "grayscale(100%)" : "none")};
`;
//*/
