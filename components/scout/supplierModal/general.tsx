import { Divider } from "@mui/material";
import { theme } from "config/theme";
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
          <InfoDescription>www.test.com</InfoDescription>
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
      <HighlightsContainer>
        <Title>Highlights</Title>
        <HighlightList>
          <HighlightListItem>
            X123 Battery - RANGE 1,500km
          </HighlightListItem>
          <HighlightListItem>
            2020 Most Innovative Battery Award
          </HighlightListItem>
        </HighlightList>
      </HighlightsContainer>
    </GeneralContainer>
  );
};

const GeneralContainer = styled.div`
  font-family: "Inter", sans-serif;
  font-style: normal;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const BasicInfoContainer = styled.div`
  margin-top: 10px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  font-weight: 500;
  font-size: 0.875rem;
`;

const InfoIcon = styled.img`
  flex-shrink: 0;
`;
const InfoTitle = styled.span`
  flex-shrink: 0;
  color: #9CA3AF;
`;
const InfoDescription = styled.span`
  flex-shrink: 1;
  width: 100%;
  text-align: end;
  color: ${theme.colors.text};
`;

const HighlightsContainer = styled.div`
  margin-top: 55px;
  margin-bottom: 26px;
`;

const HighlightList = styled.ul`
padding-inline-start: 24px;
`;

const HighlightListItem = styled.li`
  font-weight: 500;
  font-size: 0.875rem;
  color: #9CA3AF;
  margin-bottom: 10px;
`;
