import React, { useState } from "react";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import _ from "lodash";
import { SupplierModal } from "./supplierModal";
import Badge from "components/Badge";
import Icon from "components/Icon";
import { theme } from "config/theme";

const ResultCard = ({ data }: { data?: any }) => {
  const [supplierModalVisible, setSupplierModalVisible] = useState(false);

  return (
    <>
      <ResultCardContainer onClick={() => setSupplierModalVisible(true)}>
        <BrandContainer>
          {data?.id ? (
            <ImageContainer>
              {data.logo && <BrandImage src={data.logo} alt="Logo" />}
            </ImageContainer>
          ) : (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={110}
              height={118}
            />
          )}
          {data?.id ? (
            <Description>
              <TitleBadge>
                <Title>{data.longName}</Title>
                <Badge label={"VERIFIED SUPPLIER"} icon={"verified"} />
                {data.isInnovation && (
                  <Badge
                    label={"INNOVATION"}
                    color={"#EB2F96"}
                    icon={"innovation"}
                  />
                )}
              </TitleBadge>
              <Subtext>{data.description}</Subtext>
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
            {data?.id ? (
              <Property>
                <PropertyTitle>Commodity</PropertyTitle>
                <PropertyDescription>
                  <span>
                    {_.join(
                      _.uniq(
                        _.map(
                          data.products,
                          "coreCompetency.component.commoditiy.name"
                        )
                      )
                    )}
                  </span>
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>Core Competence</PropertyTitle>
                <PropertyDescription>
                  <span>
                    {_.join(_.map(data.products, "coreCompetency.name"))}
                  </span>
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>Customers Served</PropertyTitle>
                <PropertyDescription color={"#08979c"}>
                  Unlock with Membership
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>Supplier Type</PropertyTitle>
                <PropertyDescription>
                  {data.tier?.name || "Tier1"}
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>Headquarter</PropertyTitle>
                <PropertyDescription>
                  {data.headquarter?.name}
                  <CountryFlag
                    src={
                      data.headquarter
                        ? `/flags/${data.headquarter.code.toLowerCase()}.svg`
                        : ""
                    }
                  />
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
          </PropertySide>
          <PropertySide>
            {data?.id ? (
              <Property>
                <PropertyTitle>Founded</PropertyTitle>
                <PropertyDescription>
                  {" "}
                  {data.established || "-"}
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>Revenue</PropertyTitle>
                <PropertyDescription>
                  {data?.revenue || "-"}
                </PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>Capacity Availability</PropertyTitle>
                <PropertyDescription>High Open / Med Open</PropertyDescription>
              </Property>
            ) : (
              <Skeleton animation="wave" height={20} width="100%" />
            )}
            {data?.id ? (
              <Property>
                <PropertyTitle>
                  Insights (Financial, ESG, Ratings)
                </PropertyTitle>
                <PropertyDescription color={"#08979c"}>
                  VIEW INSIGHT{" "}
                  <Icon src="right-arrow" width={20} height={20} hover />
                </PropertyDescription>
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
  width: ${theme.dimension.cardMaxWidth};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 32px;
  margin-top: 16px;
  background-color: ${(props) => props.theme.colors.white};
  cursor: pointer;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
`;

const BrandImage = styled.img`
  border-radius: 2px;
`;

const CountryFlag = styled.img`
  width: 16px;
  height: 16px;
  margin-left: 5px;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  background: #ffffff;
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
  font-family: "Inter";
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
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const Subtext = styled.div`
  font-family: "Inter";
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
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #8c8c8c;
`;
const PropertyDescription = styled.span<{ color?: string }>`
  font-family: "Inter";
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => (props.color ? props.color : "#1f1f1f")};
`;

export default ResultCard;
