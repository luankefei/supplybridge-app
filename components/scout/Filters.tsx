import React from "react";
import styled from "styled-components";

import Icon from "components/Icon";
import { theme } from "config/theme";

type Props = {
  totalCount: any;
};

const Filters = ({ totalCount }: Props) => {
  return (
    <FilterContainer>
      <StaticInformation>
        <ListingCount>
          Listing {totalCount} Suppliers Matching Your Criteria
        </ListingCount>
        <SubText>Use Filters to Narrow Down Results</SubText>
      </StaticInformation>
      {/*
      <OrderContainer>
        <OrderElement>
          <Title>SUPPLIER TYPE</Title>
          <Description>
            ALL
            <Icon src={"down-arrow-gray"} width={16} height={16} />
          </Description>
        </OrderElement>
        <OrderElement>
          <Title>CAPABILITY</Title>
          <Description>
            ALL
            <Icon src={"down-arrow-gray"} width={16} height={16} />
          </Description>
        </OrderElement>
        <OrderElement>
          <Title>CERTIFICATION</Title>
          <Description>
            ALL <Icon src={"down-arrow-gray"} width={16} height={16} />
          </Description>
        </OrderElement>
      </OrderContainer>
      */}
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: ${theme.dimension.cardMaxWidth};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px;
  margin-top: 24px;
  /* box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px; */
  background-color: inherit;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin-top: 0px;
  }
`;

const StaticInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListingCount = styled.span`
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 24px;
color: ${(props) => props.theme.colors.secondary};


`;

const SubText = styled.span`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 20px;
color: #9CA3AF;
`;

const OrderContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 48px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const OrderElement = styled.span`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Title = styled.span`
font-family: 'Inter';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 20px;
color: #445B66;

`;

const Description = styled.span`
font-family: 'Inter';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 24px;
color: #9CA3AF;

gap: 8px;
display: flex;
justify-content: center;
align-items: center;
`;

export default Filters;
