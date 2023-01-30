import { Divider } from "@mui/material";
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
      <Divider style={{ margin: "20px 0" }} />
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
  margin-bottom: 15px;
  font-weight: 600;
`;

const PortfolioContainer = styled.div`
  font-family: "Inter", sans-serif;
`;

const PartnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
`;

const Tag = styled.span`
  background: #f3f4f6;
  border-radius: 8px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
  margin: 3px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
`;
