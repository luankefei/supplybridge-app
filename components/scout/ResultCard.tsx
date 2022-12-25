import React, { useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";

import { SupplierModal } from "./supplierModal";
import Badge from "components/Badge";

const ResultCard = ({ data }: { data?: any }) => {
  const [supplierModalVisible, setSupplierModalVisible] = useState(false);

  return (
    <>
      <ResultCardContainer onClick={() => setSupplierModalVisible(true)}>
        <BrandContainer>
          {data ? (
            <ImageContainer>
              <BrandImage src={data.picture} alt="become_a_supplier" />
            </ImageContainer>
          ) : (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={110}
              height={118}
            />
          )}
          {data ? (
            <Description>
              <TitleBadge>
                <Title>{data?.firmName}</Title>
                <Badge label={"VERIFIED SUPPLIER"} icon={"verified"} />
                {data?.isInnovation && (
                  <Badge
                    label={"INNOVATION"}
                    color={"#EB2F96"}
                    icon={"innovation"}
                  />
                )}
              </TitleBadge>
              <Subtext>{data?.description}</Subtext>
            </Description>
          ) : (
            <Skeleton
              animation="wave"
              height={20}
              width="75%"
              style={{ marginBottom: 6, marginLeft: 8 }}
            />
          )}
        </BrandContainer>
        <PropertyContainer>
          <PropertySide>
            {data ? (
              <Property>
                <PropertyTitle>Commodity</PropertyTitle>
                <PropertyDescription>
                  <span>{data?.commodityNames?.toString()}</span>
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Core Competence</PropertyTitle>
                <PropertyDescription>
                  <span>{data?.coreTechnologyNames?.toString()}</span>
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Customers Served</PropertyTitle>
                <PropertyDescription>
                  Nissan, BMW, Volvo and more
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Supplier Type</PropertyTitle>
                <PropertyDescription>
                  {data?.supplierType || "Tier1"}
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Headquarter</PropertyTitle>
                <PropertyDescription>
                  {data?.headquartersName}
                  <CountryFlag
                    src={`/flags/${data?.headquartersCode?.toLowerCase()}.png`}
                  />
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
          </PropertySide>
          <PropertySide>
            {data ? (
              <Property>
                <PropertyTitle>Founded</PropertyTitle>
                <PropertyDescription>2020</PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Revenue</PropertyTitle>
                <PropertyDescription>
                  {data?.revenue || "$12,000,000"}
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Capacity Availability</PropertyTitle>
                <PropertyDescription>High Open / Med Open</PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Capacity Availability</PropertyTitle>
                <PropertyDescription>High Open / Med Open</PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data ? (
              <Property>
                <PropertyTitle>Financial Rating</PropertyTitle>
                <PropertyDescription>A</PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
          </PropertySide>
        </PropertyContainer>
      </ResultCardContainer>
      <SupplierModal
        open={supplierModalVisible}
        onClose={() => setSupplierModalVisible(false)}
        data={data}
      />
    </>
  );
};

const ResultCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 32px;
  margin-top: 16px;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

const BrandImage = styled.img`
  box-shadow: inset 1px 1px 8px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
`;

const CountryFlag = styled.img`
  width: 30px;
  height: auto;
  margin-left: 5px;
  border-radius: 50%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  background: #f5f5f5;
  box-shadow: inset 1px 1px 8px rgb(0 0 0 / 8%);
  border-radius: 2px;
  max-width: 110px;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }
`;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: ${(props) => props.theme.colors.black};
  @media (max-width: 1200px) {
    font-size: 20px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 24px;
`;
const TitleBadge = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Subtext = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8c8c8c;
  margin-top: 8px;
  @media (max-width: 1200px) {
    font-size: 12px;
  }
`;

const PropertyContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  gap: 16px;
`;

const PropertySide = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 8px;
`;

const Property = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const PropertyTitle = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #8c8c8c;
`;
const PropertyDescription = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #1f1f1f;
`;

export default ResultCard;
