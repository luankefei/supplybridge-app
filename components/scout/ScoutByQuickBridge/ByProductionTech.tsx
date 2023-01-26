'use client'

import { useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByProductionTech() {
  const [selected, setSelected] = useState("")


  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select)
    } else {
      setSelected("")
    }
  }


  return (
    <>
      <CardContainer>
        <CardWrapper onClick={() => onClick("injection-molding")}>
          <BigCard src={"injection-molding"} title={"Injection Molding"} selected={selected === "injection-molding"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("forging")}>
          <BigCard src={"forging"} title={"Forging"} selected={selected === "forging"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("casting")}>
          <BigCard src={"casting"} title={"Casting"} selected={selected === "casting"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("stamping")}>
          <BigCard src={"stamping"} title={"Stamping"} selected={selected === "stamping"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("composite-part")}>
          <BigCard src={"composite-part"} title={"Composite Part"} selected={selected === "composite-part"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("structural-part")}>
          <BigCard src={"structural-part"} title={"Structural Part"} selected={selected === "structural-part"} />
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