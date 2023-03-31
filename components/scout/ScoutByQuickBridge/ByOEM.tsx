"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import BrandCard from "./BrandCard";
import BrandCardSkeleton from "./BrandCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeOEM } from "requests/useScoutByScoutBridge";

export default function ByOEM() {
  const { quickBridgeStore, oemStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    oemStore: state.quickBridgeOEMs,
  }));
  const { setFilter, setSelectedLabel } = quickBridgeStore;
  const { selected, setSelected, data } = oemStore;
  const { getOEMs, loading } = useQuickBridgeOEM();

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
      setSelectedLabel("");
      setFilter("vehicleBrands", null);
    }
  };

  useEffect(() => {
    if (!data) {
      getOEMs();
    }
  }, [data, getOEMs]);

  useEffect(() => {
    setFilter("vehicleBrands", null);
  }, []);

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
              <Title>{oem.name ?? ""}</Title>
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

/*
import { useState } from "react";
import styled from "styled-components";
import BrandCard from "./BrandCard";

export default function ByOEM() {
  const [selected, setSelected] = useState("");

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
    } else {
      setSelected("");
    }
  };

  const OEMData = {
    america: [
      { logo: "ford-logo", title: "Ford" },
      { logo: "rivian-logo", title: "Rivian" },
      { logo: "tesla-logo", title: "Tesla" },
    ],
    asia: [
      { logo: "aiways-logo", title: "Aiways" },
      { logo: "byd-logo", title: "BYD" },
      { logo: "chery-logo", title: "Chery" },
      { logo: "hiphi-logo", title: "HiPhi" },
      { logo: "greatwallmotors-logo", title: "Great Wall" },
      { logo: "liauto-logo", title: "Li Auto" },
      { logo: "nio-logo", title: "Nio" },
      { logo: "nissan-logo", title: "Nissan" },
      { logo: "honda-logo", title: "Honda" },
      { logo: "hyundai-logo", title: "Hyundai" },
    ],
    europe: [
      { logo: "astonmartin-logo", title: "Aston Martin" },
      { logo: "mercedesbenz-logo", title: "Mercedes-Benz" },
      { logo: "sonomotors-logo", title: "Sono" },
      { logo: "volkswagen-logo", title: "VW" },
      { logo: "audi-logo", title: "Audi" },
      { logo: "koenigsegg-logo", title: "Koenigsegg" },
    ],
  };

  return (
    <>
      <Container>
        <Section>
          <Title>America</Title>
          <Brands>
            {OEMData.america.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
        <Section>
          <Title>Asia</Title>
          <Brands>
            {OEMData.asia.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
        <Section>
          <Title>Europe</Title>
          <Brands>
            {OEMData.europe.map((item: any, index) => {
              return (
                <>
                  <CardWrapper onClick={() => onClick(item.title)}>
                    <BrandCard
                      key={index}
                      logo={item.logo}
                      title={item.title}
                      selected={selected === item.title}
                    />
                  </CardWrapper>
                </>
              );
            })}
          </Brands>
        </Section>
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
*/
