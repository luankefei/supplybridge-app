'use client'
'use client'

import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeVihicle } from "requests/useScoutByScoutBridge"
import { useEffect } from "react";

export default function ByVehicle() {

  const vehicleStore = useBoundStore((state) => state.vehicles);
  const { selected, setSelected, data } = vehicleStore;
  const { getVehicles, loading } = useQuickBridgeVihicle();


  const onClick = (select: any) => {
    if (select !== selected) {
      setSelected(select)
    } else {
      setSelected(null)
    }
  }

  useEffect(() => {
    if (!data) {
      getVehicles();
    }
  }, [data, getVehicles])

  if (loading) {
    return (
      <>
        {[1, 2].map((index) => (
          <CardWrapper key={index}>
            <BigCardSkeleton />
          </CardWrapper>
        ))}
      </>
    );
  }

  return (
    <>
      {data && data.map(({ id, name, icon }: any) => (
        <CardWrapper onClick={() => onClick(id)} key={id}>
          <BigCard src={icon} title={name} selected={selected === id} />
        </CardWrapper>
      ))}
    </>
  );
}

const CardWrapper = styled.span`
  cursor: pointer;
`;


/*import { useState } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";

export default function ByVehicle() {
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
      <CardWrapper onClick={() => onClick("commercial")}>
        <BigCard src={"commercial-vehicles"} title={"Commercial Vehicles"} selected={selected === "commercial"} />
      </CardWrapper>
      <CardWrapper onClick={() => onClick("passenger")}>
        <BigCard src={"automotive"} title={"Passenger Vehicles"} selected={selected === "passenger"} />
      </CardWrapper>
    </>
  )
}

const CardWrapper = styled.span`
cursor: pointer;
`;*/