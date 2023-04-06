"use client";

import { useEffect } from "react";
import styled from "styled-components";
import BigCard from "./BigCard";
import BigCardSkeleton from "./BigCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeVihicle } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";

export default function ByVehicle() {
  const { quickBridgeStore, vehicleStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    vehicleStore: state.quickBridgeVehicles,
  }));
  const { setFilter, setSelectedLabel } = quickBridgeStore;
  const { selected, setSelected, data } = vehicleStore;
  const { getVehicles, loading } = useQuickBridgeVihicle();
  const router = useRouter();

  const onClick = (select: any) => {
    if (select !== selected) {
      setSelected(select);
      setFilter("vehicleTypes", select);
      let label = data.find((d: any) => d.id == select).name;
      setSelectedLabel(label);
      if (!data || !Array.isArray(data)) return;
      const item = data.find((item) => item.id === select);
      if (!item || !item.id) return;
      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.vehile}/${item.name}`
      );
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("vehicleTypes", null);

      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.vehile}`
      );
    }
  };

  useEffect(() => {
    if (!data) {
      getVehicles();
      return;
    }
  }, [data, getVehicles, setSelected, setFilter]);

  useEffect(() => {
    if (!data || !Array.isArray(data)) return;

    if (
      router.query &&
      router.query.slug &&
      Array.isArray(router.query.slug) &&
      router.query.slug.length > 0
    ) {
      if (router.query.slug.length > 2 && router.query.slug[2]) {
        const slug = router.query.slug[2];
        const item = data.find(
          (item) => item.name.toLowerCase() === slug.toLowerCase()
        );

        if (item && item.id) {
          setSelected(item.id);
          setFilter("vehicleTypes", item.id);
        } else {
          setSelected(null);
          setFilter("vehicleTypes", null);
        }
      }
    }
  }, [data]);

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
