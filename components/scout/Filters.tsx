import React from "react";
import styled from "styled-components";

import Icon from "components/Icon";
import { theme } from "config/theme";

import useStore from "hooks/useStore";
import { Trans } from "react-i18next";

type Props = {
  totalCount: any;
};

const Filters = ({ totalCount }: Props) => {
  const { filterData, stats } = useStore();
  const count = totalCount,
    q = stats?.chain?.length
      ? stats.chain[stats.chain.length - 1]
      : filterData.q;
  return (
    <FilterContainer>
      <StaticInformation>
        <ListingCount>
          <Trans i18nKey="scout.result.overview" count={count}>
            Listing <strong>{{ count } as any}</strong> supplier(s) matching for
            &#34;{{ q } as any}&#34;
          </Trans>
        </ListingCount>
        {/*<SubText>Use Filters to Narrow Down Results</SubText>*/}
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
  padding: 8px 30px;
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
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${(props) => props.theme.colors.secondary};
  > strong {
    font-size: 24px;
  }
`;

const SubText = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #9ca3af;
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
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #445b66;
`;

const Description = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: #9ca3af;
  gap: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Filters;
