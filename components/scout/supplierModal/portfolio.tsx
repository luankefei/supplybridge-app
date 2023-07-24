import { Divider } from "@mui/material";
import { theme } from "config/theme";
import styled from "styled-components";

export const PortfolioTabPanel = () => {
  return (
    <PortfolioContainer>
      <Title>Key Partners</Title>
      <PartnerContainer>
        <Tag>Tesla</Tag>
        <Tag>VW</Tag>
        <Tag>GM</Tag>
        <Tag>Kia</Tag>
        <Tag>BMW</Tag>
        <Tag>Daimler</Tag>
        <Tag>Li Auto</Tag>
        <Tag>Geely</Tag>
      </PartnerContainer>
      <Divider style={{ margin: "24px 0", borderColor: "transparent" }} />
      <Title>Product Lines</Title>
      <ProductContainer>
        <Tag>NCM523</Tag>
        <Tag>NCM622</Tag>
        <Tag>NCM811</Tag>
        <Tag>Ni55</Tag>
        <Tag>NP2.0</Tag>
      </ProductContainer>
    </PortfolioContainer>
  );
};

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const PortfolioContainer = styled.div`
  font-family: "Inter", sans-serif;
  font-style: normal;
`;

const PartnerContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.span`
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: ${theme.colors.text};
`;

const ProductContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
