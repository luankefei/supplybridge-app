"use client";

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
        <CardWrapper onClick={() => onClick("startups")}>
          <BigCard
            src={"startups"}
            title={"Startups"}
            selected={selected === "startups"}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("innovations")}>
          <BigCard
            src={"innovations"}
            title={"Innovations"}
            selected={selected === "innovations"}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("dei")}>
          <BigCard
            src={"dei"}
            title={"Diversity, Equity, and Inclusion (DEI)"}
            selected={selected === "dei"}
            infoContent={deiInfoContent}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("recyclers")}>
          <BigCard
            src={"recyclers"}
            title={"Recyclers"}
            selected={selected === "recyclers"}
          />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("sustainable-production")}>
          <BigCard
            src={"sustainable-production"}
            title={"Sustainable Production"}
            selected={selected === "sustainable-production"}
            infoContent={sustainableInfoContent}
          />
        </CardWrapper>
        <CardWrapper
          onClick={() => onClick("esg")}
          style={{ filter: "grayscale(100%)" }}
        >
          <BigCard
            src={"esg"}
            title={"ESG"}
            selected={selected === "esg"}
            width={60}
            height={60}
            infoContent={esgInfoContent}
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

const CardWrapper = styled.span`
  cursor: pointer;
`;
