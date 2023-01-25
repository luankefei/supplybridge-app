'use client'

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