"use client";

import { useEffect } from "react";
import { Divider, Skeleton } from "@mui/material";
import styled from "styled-components";
import BrandCard from "./brandCard";
import BrandCardSkeleton from "./brandCardSkeleton";
import ModelCard, { ModelBlankCard } from "./modelCard";
import ModelCardSkeleton from "./modelCardSkeleton";
import useBoundStore from "hooks/useBoundStore";
import { useQuickBridgeSegment } from "requests/useScoutByScoutBridge";
import {
  VehicleBrandModel,
  VehicleModel,
  VehicleSegment,
} from "hooks/quick-bridge/segmentSlice";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const nameKeyMap: any = {
  Microcar: "scout.quickbridge.microcar",
  "A-segment": "scout.quickbridge.segmenta",
  "B-segment": "scout.quickbridge.segmentb",
  "C-segment": "scout.quickbridge.segmentc",
  "D-segment": "scout.quickbridge.segmentd",
  "E-segment": "scout.quickbridge.segmente",
  "3 Series": "scout.quickbridge.series3",
  "5 Series": "scout.quickbridge.series5",
  "7 Series": "scout.quickbridge.series7",
  "C-Class": "scout.quickbridge.classc",
  "E-Class": "scout.quickbridge.classe",
  "S-Class": "scout.quickbridge.classs",
  A4: "scout.quickbridge.a4",
  A6: "scout.quickbridge.a4",
  A8: "scout.quickbridge.a4",
};

export default function BySegment() {
  const { t } = useTranslation();
  const { quickBridgeStore, segmentStore } = useBoundStore((state) => ({
    quickBridgeStore: state.quickBridge,
    segmentStore: state.quickBridgeSegments,
  }));
  const { setFilter, setSelectedLabel, tab } = quickBridgeStore;
  const { selected, setSelected, brandModels, segments } = segmentStore;
  const { getBrandModels, loading } = useQuickBridgeSegment();
  const router = useRouter();

  const onClick = (select: any) => {
    if (selected !== select) {
      setSelected(select);
      let label = "";
      loopOut: for (let i = 0; i < segments.length; i++) {
        for (let j = 0; j < segments[i].vehicleModels.length; j++) {
          if (segments[i].vehicleModels[j].id == select) {
            label = segments[i].vehicleModels[j].name;
            break loopOut;
          }
        }
      }
      setSelectedLabel(label);
      setFilter("vehicleModels", select);
    } else {
      setSelected(null);
      setFilter("vehicleModels", null);
      setSelectedLabel("");
    }
  };

  /*
  useEffect(() => {
    setFilter("vehicleModels", null);
  }, []);
  */

  useEffect(() => {
    if (!brandModels) {
      getBrandModels();
    }
  }, [brandModels, getBrandModels]);

  useEffect(() => {
    // when this is the active tab, clear the selection/filter
    if (tab.activeTab == 3) {
      setFilter("vehicleModels", null);
      setSelectedLabel("");
      setSelected(null);
    }
  }, [tab]);

  if (loading) {
    return (
      <Container>
        <Segments>
          {[1, 2, 3, 4, 5, 6].map((segmentIndex) => (
            <SegmentButtonSkeleton variant="rounded" key={segmentIndex} />
          ))}
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
                      {[1, 2, 3, 4, 5, 6].map((modelIndex) => (
                        <ModelCardWrapper key={modelIndex}>
                          <ModelCardSkeleton />
                        </ModelCardWrapper>
                      ))}
                    </ModelsWrapper>
                  </Section>
                  {brandIndex + 1 !== 3 && <StyledDivider />}
                </>
              );
            })}
          </>
        </Models>
      </Container>
    );
  }
  return (
    <Container>
      <Segments>
        {segments &&
          segments.map((segment: VehicleSegment) => (
            <SegmentButton key={segment.id}>
              {t(nameKeyMap[segment.name], segment.name)}
            </SegmentButton>
          ))}
      </Segments>

      <Models>
        <>
          {brandModels?.map((brand: VehicleBrandModel, brandIndex: any) => {
            return (
              <>
                <Section key={brand.id}>
                  <Brand>
                    <BrandCard
                      logo={brand.logo}
                      title={brand.name}
                      clickable={false}
                      selected={false}
                    />
                  </Brand>
                  <ModelsWrapper>
                    {brand?.models?.map((model: VehicleModel, index: any) =>
                      model.id ? (
                        <ModelCardWrapper
                          key={index}
                          onClick={() => onClick(model.id)}
                        >
                          <ModelCard
                            title={t(nameKeyMap[model.name], model.name)}
                            selected={selected === model.id}
                          />
                        </ModelCardWrapper>
                      ) : (
                        <ModelCardWrapper key={index}>
                          <ModelBlankCard />
                        </ModelCardWrapper>
                      )
                    )}
                  </ModelsWrapper>
                </Section>
                {brandIndex + 1 !== brandModels.length && <StyledDivider />}
              </>
            );
          })}
        </>
      </Models>
    </Container>
  );
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
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 16px;
`;

const SegmentButtonSkeleton = styled(Skeleton)`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 54px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
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

const Brand = styled.div``;

const ModelsWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 64px;
`;

const StyledDivider = styled(Divider)`
  border-color: #d1d5db !important;
`;
