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

const CardWrapper = styled.span<{disabled:boolean}>`
  cursor: ${(props)=>props.disabled? 'default' : 'pointer'};
`;
