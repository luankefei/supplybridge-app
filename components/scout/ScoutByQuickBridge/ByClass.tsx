"use client";

import { useEffect } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import BrandCard from "./BrandCard";
import BrandCardSkeleton from "./BrandCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeClass } from "requests/useScoutByScoutBridge";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";

export default function ByClass() {
  const { quickBridgeStore, classStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    classStore: state.quickBridgeClasses,
  }));
  const { setFilter, setSelectedLabel } = quickBridgeStore;
  const { selected, setSelected, data } = classStore;
  const { getClasses, loading } = useQuickBridgeClass();
  const router = useRouter();

  const onClick = (select: any) => {
    if (select !== selected) {
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
      setSelected(select);
      setFilter("vehicleBrands", select);

      if (!data || !Array.isArray(data)) return;
      const item = data
        .flatMap((item) => item.vehicleBrands)
        .find((item) => item.id === select);
      if (!item || !item.name) return;
      router.push(
        `/scout/${ScoutSwitchType.quickBridge.toLowerCase()}/${QuickBridgeTabType.class.toLowerCase()}/${item.name.toLowerCase()}`
      );
    } else {
      setSelectedLabel("");
      setSelected(null);
      setFilter("vehicleBrands", select);

      router.push(
        `/scout/${ScoutSwitchType.quickBridge.toLowerCase()}/${QuickBridgeTabType.class.toLowerCase()}`
      );
    }
  };

  useEffect(() => {
    if (!data) {
      getClasses();
    }
  }, [data, getClasses]);

  useEffect(() => {
    setFilter("vehicleBrands", null);
  }, []);

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
        const item = data
          .flatMap((item) => item.vehicleBrands)
          .find((item) => item.name.toLowerCase() === slug.toLowerCase());

        if (item && item.id) {
          setSelected(item.id);
          setFilter("vehicleBrands", item.id);
        } else {
          setSelected(null);
          setFilter("vehicleBrands", null);
        }
      }
    }
  }, [data]);

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
          data.map((_class: any, classIndex: any) => (
            <Section key={classIndex}>
              <Title>{_class.name ?? ""}</Title>
              <Brands>
                {_class.vehicleBrands &&
                  _class.vehicleBrands.map((brand: any, brandIndex: any) => (
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

export default function ByClass() {
  const [selected, setSelected] = useState("");

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
    } else {
      setSelected("");
    }
  };

  const ClassData = {
    volumn: [
      { logo: "ford-logo", title: "Ford" },
      { logo: "aiways-logo", title: "Aiways" },
      { logo: "byd-logo", title: "BYD" },
      { logo: "chery-logo", title: "Chery" },
      { logo: "greatwallmotors-logo", title: "Great Wall" },
      { logo: "nissan-logo", title: "Nissan" },
      { logo: "honda-logo", title: "Hongda" },
      { logo: "generalmotors-logo", title: "GM" },
      { logo: "volkswagen-logo", title: "VW" },
    ],
    ev: [
      { logo: "rivian-logo", title: "Rivian" },
      { logo: "tesla-logo", title: "Tesla" },
      { logo: "hiphi-logo", title: "HiPhi" },
      { logo: "liauto-logo", title: "Li Auto" },
      { logo: "nio-logo", title: "Nio" },
      { logo: "hyundai-logo", title: "Hyundai" },
    ],
    premium: [
      { logo: "mercedesbenz-logo", title: "Mercedes-Benz" },
      { logo: "audi-logo", title: "Audi" },
    ],
    sports: [
      { logo: "astonmartin-logo", title: "Aston Martin" },
      { logo: "koenigsegg-logo", title: "Koenigsegg" },
    ],
  };

  return (
    <>
      <Container>
        <Section>
          <Title>Volume</Title>
          <Brands>
            {ClassData.volumn.map((item: any, index) => {
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
          <Title>EV</Title>
          <Brands>
            {ClassData.ev.map((item: any, index) => {
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
          <Title>Premium</Title>
          <Brands>
            {ClassData.premium.map((item: any, index) => {
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
          <Title>Sports</Title>
          <Brands>
            {ClassData.sports.map((item: any, index) => {
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
