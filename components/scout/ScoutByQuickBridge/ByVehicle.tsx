"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeVihicle } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";

export default function ByVehicle() {
  const { quickBridgeStore, vehicleStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    vehicleStore: state.quickBridgeVehicles,
  }));
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
  const { selected, setSelected, data } = vehicleStore;
  const { getVehicles, loading } = useQuickBridgeVihicle();
  const router = useRouter();

  // console.log("tab: ", tab);

  const onClick = (select: any) => {
    if (select !== selected) {
      setSelected(select);
      setFilter("vehicleTypes", select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("vehicleTypes", null);
    }
  };

  useEffect(() => {
    if (!data) {
      getVehicles();
      return;
    }
  }, [data, getVehicles, setSelected, setFilter]);

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 0) {
      setFilter("vehicleTypes", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

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
      {data &&
        data.map(({ id, name, icon }: any) => (
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
