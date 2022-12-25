import { Divider } from "@mui/material";
import styled from "styled-components";

export const GeneralTabPanel = () => {
  return (
    <GeneralContainer>
      <Title>Basic Info</Title>
      <BasicInfoContainer>
        <InfoItem>
          <InfoIcon src="/icons/building.svg" />
          <InfoTitle>HQ Location:</InfoTitle>
          <InfoDescription>China</InfoDescription>
        </InfoItem>
        <InfoItem>
          <InfoIcon src="/icons/map.svg" />
          <InfoTitle>Regions:</InfoTitle>
          <InfoDescription>APAC</InfoDescription>
        </InfoItem>
        <InfoItem>
          <InfoIcon src="/icons/web.svg" />
          <InfoTitle>Website:</InfoTitle>
          <InfoDescription>www.catl.com</InfoDescription>
        </InfoItem>
        <InfoItem>
          <InfoIcon src="/icons/dollar.svg" />
          <InfoTitle>Revenue:</InfoTitle>
          <InfoDescription>$20.24 Billion (2021)</InfoDescription>
        </InfoItem>
        <InfoItem>
          <InfoIcon src="/icons/dollar.svg" />
          <InfoTitle>Employees:</InfoTitle>
          <InfoDescription>30,000 (2021)</InfoDescription>
        </InfoItem>
        <InfoItem>
          <InfoIcon src="/icons/location.svg" />
          <InfoTitle>Global Footprint:</InfoTitle>
          <InfoDescription>China, Germany</InfoDescription>
        </InfoItem>
        <InfoItem>
          <InfoIcon src="/icons/layer.svg" />
          <InfoTitle>Type:</InfoTitle>
          <InfoDescription>Tier 1</InfoDescription>
        </InfoItem>
      </BasicInfoContainer>
      <Divider style={{ marginTop: "30px" }} />
      <HighlightsContainer>
        <Title>Highlights</Title>
        <HighlightList>
          <HighlightListItem>
            Qilin Battery (2023) - RANGE 1,000km
          </HighlightListItem>
          <HighlightListItem>
            Qilin Battery Volume Utilization Efficiency 72%
          </HighlightListItem>
          <HighlightListItem>
            Qilin Battery Volume Utilization Efficiency 72%
          </HighlightListItem>
          <HighlightListItem>
            Qilin Battery Volume Utilization Efficiency 72%
          </HighlightListItem>
          <HighlightListItem>
            Qilin Battery Volume Utilization Efficiency 72%
          </HighlightListItem>
          <HighlightListItem>
            Qilin Battery Volume Utilization Efficiency 72%
          </HighlightListItem>
          <HighlightListItem>
            Qilin Battery Volume Utilization Efficiency 72%
          </HighlightListItem>
        </HighlightList>
      </HighlightsContainer>
    </GeneralContainer>
  );
};

const GeneralContainer = styled.div`
  font-family: "Ubuntu", sans-serif !important;
`;
const Title = styled.div``;

const BasicInfoContainer = styled.div`
  margin-top: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const InfoIcon = styled.img`
  margin-right: 10px;
`;
const InfoTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #6b7280;
  margin-right: 10px;
`;
const InfoDescription = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #111827;
`;

const HighlightsContainer = styled.div`
  margin-top: 20px;
`;

const HighlightList = styled.ul``;
const HighlightListItem = styled.li`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #6b7280;
  margin-bottom: 10px;
`;
