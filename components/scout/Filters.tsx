import React from "react";
import styled from "styled-components";

type Props = {
  totalCount: any;
};

export const Filters = ({ totalCount }: Props) => {
  return (
    <FilterContainer>
      <StaticInformation>
        <ListingCount>
          Listing {totalCount} Suppliers Matching Your Criteria
        </ListingCount>
        <SubText>Use Filters to Narrow Down Results</SubText>
      </StaticInformation>
      <div>Filter will coming soon</div>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 24px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.colors.white};
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin-top: 0px;
  }
`;

const StaticInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListingCount = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const SubText = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.text};
`;
