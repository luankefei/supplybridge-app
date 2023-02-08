"use client"

import { useEffect, useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeCommodity } from "requests/useScoutByScoutBridge"

export default function ByCommodity() {
  const { quickBridgeStore, commodityStore } =
    useBoundStore((state) => ({
      quickBridgeStore: state.quickBridge,
      commodityStore: state.quickBridgeCommodities
    }));
  const { setFilter,setSuppliers, suppliers} = quickBridgeStore;
  const { selected, setSelected, data } = commodityStore;
  const { getCommodities, loading } = useQuickBridgeCommodity();
  const onClick = (select: any) => {
    console.log("selected",select)
    if (selected !== select) {
      setSelected(select);
      setFilter("commodities", select);
    } else {
      setSelected(null);
    }
  }

  
  useEffect(() => {
    if (!data) {
      getCommodities();
    }   
  }, [data, getCommodities])

  if (loading) {
    return (
      <CardContainer>
        {[1, 2, 3, 4].map((index) => (
          <CardWrapper key={index}>
            <BigCardSkeleton />
          </CardWrapper>
        ))}
      </CardContainer>
    );
  }
console.log("commodity data",data)
  return (
    <CardContainer>
      {data && data.map(({ id, name, icon }: any) => (
        [4,6].includes(id)? null : 
        <CardWrapper onClick={() => onClick(id)} key={id}>
          <BigCard src={icon} title={name} selected={selected === id} />
        </CardWrapper>
      ))}

       <CardWrapper onClick={() => onClick([4,6])} key={4}>
          <BigCard src={data?.find((o:any) => o.id === 4).icon} title="Interior/Exterior" selected={Array.isArray(selected) && [4,6].every((i)=>selected.includes(i))} />
       </CardWrapper>
    </CardContainer>
  )
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

/*
import { useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByCommodity() {
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
        <CardWrapper onClick={() => onClick("powertrain")}>
          <BigCard src={"powertrain"} title={"Powertrain"} selected={selected === "powertrain"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("chassis")}>
          <BigCard src={"chassis"} title={"Chassis"} selected={selected === "chassis"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("interior-exterior")}>
          <BigCard src={"interior-exterior"} title={"Interior/Exterior"} selected={selected === "interior-exterior"} width={80} height={80} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("electronics")}>
          <BigCard src={"electronics"} title={"Electronics"} selected={selected === "electronics"} width={80} height={80} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("general-parts")}>
          <BigCard src={"general-parts"} title={"General (Standard) Parts"} selected={selected === "general-parts"} />
        </CardWrapper>
        <CardWrapper onClick={() => onClick("raw-materials")}>
          <BigCard src={"raw-materials"} title={"Raw materials"} selected={selected === "raw-materials"} />
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
*/