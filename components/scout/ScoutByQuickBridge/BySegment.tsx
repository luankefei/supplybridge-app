"use client"

import { useEffect } from "react";
import { Divider, Skeleton } from "@mui/material";
import styled from "styled-components"
import BrandCard from "./BrandCard";
import BrandCardSkeleton from "./BrandCardSkeleton";
import ModelCard, { ModelBlankCard } from "./ModelCard";
import ModelCardSkeleton from "./ModelCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeSegment } from "requests/useScoutByScoutBridge"
import { VehicleBrandModel, VehicleModel, VehicleSegment } from "hooks/quick-bridge/segmentSlice";
import { useRouter } from "next/router";
import { QuickBridgeTabType, ScoutSwitchType } from "utils/constants";

export default function BySegment() {
  const { quickBridgeStore, segmentStore } =
    useBoundStore((state) => ({
      quickBridgeStore: state.quickBridge,
      segmentStore: state.quickBridgeSegments
    }));
  const { setFilter } = quickBridgeStore;
  const { selected, setSelected, brandModels, segments } = segmentStore;
  const { getBrandModels, loading } = useQuickBridgeSegment();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      setFilter("vehicleModels", select);

      if (!brandModels || !Array.isArray(brandModels)) return;
      const item = brandModels.flatMap((item) => item.models).find((item) => item.id === select);
      if (!item || !item.id) return;
      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.segment}/${item.name}`
      );
    } else {
      setSelected(null);
      setFilter("vehicleModels", null);

      router.push(
        `/scout/${ScoutSwitchType.quickBridge}/${QuickBridgeTabType.segment}`
      );
    }
  }

  useEffect(() => {
    if (!brandModels) {
      getBrandModels();
    }
  }, [brandModels, getBrandModels]);

  useEffect(() => {
    if (!brandModels || !Array.isArray(brandModels)) return;

    if (router.query && router.query.slug && Array.isArray(router.query.slug) && router.query.slug.length > 0) {
      if (router.query.slug.length > 2 && router.query.slug[2]) {
        const slug = router.query.slug[2];
        const item = brandModels.flatMap((item) => item.models).find((item) => item.name.toLowerCase() === slug.toLowerCase());
        if (item && item.id) {
          setSelected(item.id);
          setFilter("vehicleModels", item.id);
        } else {
          setSelected(null);
          setFilter("vehicleModels", null);
        }
      }
    }
  }, [brandModels]);

  if (loading) {
    return (
      <Container>
        <Segments>
          {[1, 2, 3, 4, 5, 6].map((segmentIndex) =>
            <SegmentButtonSkeleton variant="rounded" key={segmentIndex} />
          )}
        </Segments>

        <Models>
          <>
            {[1, 2, 3].map((brandIndex) => {
              return (
                <>
                  <Section key={brandIndex}>
                    <Brand>
                      <BrandCardSkeleton />
                    </Brand>
                    <ModelsWrapper>
                      {[1, 2, 3, 4, 5, 6].map((modelIndex) =>
                        <ModelCardWrapper key={modelIndex}>
                          <ModelCardSkeleton />
                        </ModelCardWrapper>
                      )}
                    </ModelsWrapper>
                  </Section>
                  {brandIndex + 1 !== 3 &&
                    <StyledDivider />
                  }
                </>
              )
            })}
          </>
        </Models>
      </Container>
    )
  }
  return (
    <Container>
      <Segments>
        {segments && segments.map((segment: VehicleSegment) =>
          <SegmentButton key={segment.id}>{segment.name}</SegmentButton>
        )}
      </Segments>

      <Models>
        <>
          {brandModels?.map((brand: VehicleBrandModel, brandIndex: any) => {
            return (
              <>
                <Section key={brand.id}>
                  <Brand>
                    <BrandCard logo={brand.logo} title={brand.name} clickable={false} selected={false} />
                  </Brand>
                  <ModelsWrapper>
                    {brand?.models?.map((model: VehicleModel, index: any) =>
                      model.id ? (
                        <ModelCardWrapper key={index} onClick={() => onClick(model.id)}>
                          <ModelCard title={model.name} selected={selected === model.id} />
                        </ModelCardWrapper>
                      ) : (
                        <ModelCardWrapper key={index}>
                          <ModelBlankCard />
                        </ModelCardWrapper>
                      )
                    )}
                  </ModelsWrapper>
                </Section>
                {brandIndex + 1 !== brandModels.length &&
                  <StyledDivider />
                }
              </>
            )
          })}
        </>
      </Models>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: flex-start;
  width: 100%;
`;

const Segments = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 196px;
`;

const SegmentButton = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 54px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 16px;
`;

const SegmentButtonSkeleton = styled(Skeleton)`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 54px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 16px;
`;

const Models = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`;

const ModelCardWrapper = styled.span`
  cursor: pointer;  
`;

const Section = styled.div`
  display: flex;
  gap: 8px;
`;

const Brand = styled.div`

`;

const ModelsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 64px;
`;

const StyledDivider = styled(Divider)`
  border-color: #D1D5DB !important;
`

/*
import { Divider } from "@mui/material";
import { useState } from "react";
import styled from "styled-components"
import BrandCard from "./BrandCard";
import ModelCard from "./ModelCard";

export default function BySegment() {
  const [selected, setSelected] = useState("")


  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select)
    } else {
      setSelected("")
    }
  }

  const data = [
    {
      brand: {
        logo: "audi-logo",
        title: "Audi",
        models: [
          {
            title: "A4"
          },
          {
            title: "A6"
          },
          {
            title: "A8"
          },
        ]
      }
    },
    {
      brand: {
        logo: "mercedesbenz-logo",
        title: "Mercedes-Benz",
        models: [
          {
            title: "C-Class"
          },
          {
            title: "E-Class"
          },
          {
            title: "S-Class"
          },
        ]
      }
    },
  ]


  return (
    <Container>
      <Segments>
        <SegmentButton>Microcar</SegmentButton>
        <SegmentButton>A-segment</SegmentButton>
        <SegmentButton>B-segment</SegmentButton>
        <SegmentButton>C-segment</SegmentButton>
        <SegmentButton>D-segment</SegmentButton>
        <SegmentButton>E-segment</SegmentButton>
      </Segments>

      <Models>
        <>
          {data?.map((item: any, index: any) => {
            return (
              <>
                <Section key={index}>
                  <Brand>
                    <BrandCard logo={item.brand.logo} title={item.brand.title} clickable={false} />
                  </Brand>
                  <ModelsWrapper>
                    {item?.brand.models?.map((model: any, i: any) => {
                      return (
                        <>
                          <ModelCardWrapper key={i} onClick={() => onClick(model.title)}>
                            <ModelCard title={model.title} selected={selected === model.title} />
                          </ModelCardWrapper>
                        </>
                      )
                    })}
                  </ModelsWrapper>
                </Section>
                {index + 1 !== data.length &&
                  <Divider sx={{ bgcolor: "#E5E7EB" }} />
                }
              </>
            )
          })}
        </>
      </Models>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: flex-start;
  width: 100%;
`;

const Segments = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const SegmentButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 54px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  border-radius: 16px;
`;

const Models = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 30px;
`;

const ModelCardWrapper = styled.span`
  cursor: pointer;  
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Brand = styled.div`

`;

const ModelsWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding-right: 132px;
`;
//*/