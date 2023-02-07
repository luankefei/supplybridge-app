"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgePioneer } from "requests/useScoutByScoutBridge"
import _ from "lodash";

export default function ByPioneer() {
  const { quickBridgeStore, pioneerStore } =
    useBoundStore((state) => ({
      quickBridgeStore: state.quickBridge,
      pioneerStore: state.quickBridgePioneers
    }));
  const { setFilter } = quickBridgeStore;
  const { selected, setSelected, data } = pioneerStore;
  const { getPioneers, loading } = useQuickBridgePioneer();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      setFilter("pioneers", select);
    } else {
      setSelected(null);
    }
  }

  useEffect(() => {
    if (!data) {
      getPioneers();
    }
  }, [data, getPioneers])

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
      return (
        items.map((item: any) => (<div key={item}>{item}</div>))
      )
    }
    return <div>{description}</div>
  }

  return (
    <CardContainer>
      {data && data.map(({ id, name, icon, description, isActive }: any) => (
        description ? (
          <CardWrapper onClick={() => onClick(id)} key={id} disabled={!isActive}>
            <BigCard src={icon} title={name} selected={selected === id} infoContent={InfoContent(description)} disabled={!isActive} />
          </CardWrapper>
        ) : (
          <CardWrapper onClick={() => onClick(id)} key={id} disabled={!isActive}>
            <BigCard src={icon} title={name} selected={selected === id} disabled={!isActive} />
          </CardWrapper>
        )
      ))}
    </CardContainer >
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
  cursor: ${(props) => props.disabled ? "default" : "pointer"};
  filter: ${(props) => props.disabled ? "grayscale(100%)" : "none"};
`;
//*/

/*
import React, { useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByPioneer() {
  const [selected, setSelected] = useState("");

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
    } else {
      setSelected("");
    }
  };

  const deiInfoContent = (
    <ul style={{ paddingLeft: "15px" }}>
      <li>Minority-owned Business Enterprise (MBE)</li>
      <li>Women Business Enterprise (WBE)</li>
      <li>LGBTQ+ Business Enterprise (LGBTE)</li>
      <li>Veteran-Owned Business Enterprise (VOB)</li>
      <li>Disability-owned Business Enterprise (DOBE)</li>
      <li>Others…</li>
    </ul>
  );

  const sustainableInfoContent =
    "Production that utilize Green/Renewable Energy (ie. Green Steel) or LEED Certified Facilities, or met EU Taxonomy Regulations.";

  const esgInfoContent = "Companies who have an ESG Rating / Assessment.";

  return (
    <>
      <CardContainer>
        <CardWrapper onClick={() => onClick("startups")} disabled={false}>
          <BigCard
            src={"startups"}
            title={"Startups"}
            selected={selected === "startups"}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("innovations")} disabled={false}>
          <BigCard
            src={"innovations"}
            title={"Innovations"}
            selected={selected === "innovations"}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("dei")} disabled={false}>
          <BigCard
            src={"dei"}
            title={"Diversity, Equity, and Inclusion (DEI)"}
            selected={selected === "dei"}
            infoContent={deiInfoContent}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("recyclers")} disabled={false}>
          <BigCard
            src={"recyclers"}
            title={"Recyclers"}
            selected={selected === "recyclers"}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("sustainable-production")} disabled={false}>
          <BigCard
            src={"sustainable-production"}
            title={"Sustainable Production"}
            selected={selected === "sustainable-production"}
            infoContent={sustainableInfoContent}
          />
        </CardWrapper>
        <CardWrapper

          style={{ filter: "grayscale(100%)" }}
          disabled={true}
        >
          <BigCard
            src={"disabled-rating"}
            title={"ESG"}
            selected={selected === "esg"}
            width={80}
            height={80}
            infoContent={esgInfoContent}
            disabled={true}
          />
        </CardWrapper>
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 24px;
`;

const CardWrapper = styled.span<{ disabled: boolean }>`
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
`;
//*/