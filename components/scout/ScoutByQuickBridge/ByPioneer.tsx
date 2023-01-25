'use client'

import { useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByPioneer() {
  const [selected, setSelected] = useState("")


  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select)
    } else {
      setSelected("")
    }
  }

  const deiInfoContent = [
    "Minority-owned Business Enterprise (MBE)",
    "Women Business Enterprise (WBE)",
    "LGBTQ+ Business Enterprise (LGBTE)",
    "Veteran-Owned Business Enterprise (VOB)",
    "Disability-owned Business Enterprise (DOBE)",
    "Others…"
  ]

  const sustainableInfoContent = [
    "Green Energy / Renewable Energy",
    "Recycling / Secondary Material"
  ]

  return (
    <>
      <CardContainer>
        <CardWrapper onClick={() => onClick("startups")}>
          <BigCard src={"startups"} title={"Startups"} selected={selected === "startups"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("innovations")}>
          <BigCard src={"innovations"} title={"Innovations"} selected={selected === "innovations"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("dei")}>
          <BigCard src={"dei"} title={"Diversity, Equity, and Inclusion (DEI)"} selected={selected === "dei"} infoContent={deiInfoContent} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("recyclers")}>
          <BigCard src={"recyclers"} title={"Recyclers"} selected={selected === "recyclers"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("sustainable-production")}>
          <BigCard src={"sustainable-production"} title={"Sustainable Production"} selected={selected === "sustainable-production"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("esg")}>
          <BigCard src={"esg"} title={"ESG"} selected={selected === "esg"} width={60} height={60} />
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