import React from "react";
import styled from "styled-components";

export const Filters = () => {
  return (
    <FilterContainer>
      <StaticInformation>
        <ListingCount>
          Listing 999,999 Suppliers Matching Your Criteria
        </ListingCount>
        <SubText>Use Filters to Narrow Down Results</SubText>
      </StaticInformation>
      <div>Filter Gelecek</div>
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
