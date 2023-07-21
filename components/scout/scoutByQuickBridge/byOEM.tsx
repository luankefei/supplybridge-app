"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import BrandCard from "./brandCard";
import BrandCardSkeleton from "./brandCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeOEM } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const nameKeyMap: any = {
  America: "scout.quickbridge.america",
  Asia: "scout.quickbridge.asia",
  Europe: "scout.quickbridge.europe",
};

export default function ByOEM() {
  const { t } = useTranslation();
  const { quickBridgeStore, oemStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    oemStore: state.quickBridgeOEMs,
  }));
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
  const { selected, setSelected, data } = oemStore;
  const { getOEMs, loading } = useQuickBridgeOEM();
  const router = useRouter();

  const onClick = (select: any) => {
    if (select !== selected) {
      setSelected(select);
      let label = "";
      loopOut: for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].vehicleBrands.length; j++) {
          if (data[i].vehicleBrands[j].id == select) {
            label = data[i].vehicleBrands[j].name;
            break loopOut;
          }
        }
      }
      setSelectedLabel(label);
      setFilter("vehicleBrands", select);
    } else {
      setSelected(null);
      setFilter("vehicleBrands", null);
      setSelectedLabel("");
    }
  };

  useEffect(() => {
    if (!data) {
      getOEMs();
    }
  }, [data, getOEMs]);

  /*
  useEffect(() => {
    setFilter("vehicleBrands", null);
  }, []);
  */

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 1) {
      setFilter("vehicleBrands", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

  if (loading) {
    return (
      <>
        <Container>
          {[1, 2].map((index) => (
            <Section key={index}>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.125rem", marginBottom: "30px" }}
                width="60px"
              />
              <Brands>
                {[1, 2, 3, 4, 5].map((brandIndex) => (
                  <CardWrapper key={brandIndex}>
                    <BrandCardSkeleton />
                  </CardWrapper>
                ))}
              </Brands>
            </Section>
          ))}
        </Container>
      </>
    );
  }

  return (
    <>
      <Container>
        {data &&
          data.map((oem: any, oemIndex: any) => (
            <Section key={oemIndex}>
              <Title>{t(nameKeyMap[oem.name], oem.name || "") as any}</Title>
              <Brands>
                {oem.vehicleBrands &&
                  oem.vehicleBrands.map((brand: any, brandIndex: any) => (
                    <CardWrapper
                      key={brandIndex}
                      onClick={() => onClick(brand.id)}
                    >
                      <BrandCard
                        key={brand.id}
                        logo={brand.logo}
                        title={brand.name}
                        selected={selected === brand.id}
                      />
                    </CardWrapper>
                  ))}
              </Brands>
            </Section>
          ))}
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 60px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 30px;
`;

const Title = styled.span`
  margin-bottom: 30px;
`;

const Brands = styled.span<any>`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  gap: 24px;
  @media (max-width: 1200px) {
    grid-template-columns: auto auto auto;
  }
`;

const CardWrapper = styled.span`
  cursor: pointer;
`;
