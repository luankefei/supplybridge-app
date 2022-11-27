import React from "react";
import styled from "styled-components";

import { Badge } from "components";

export const ResultCard = () => {
  return (
    <ResultCardContainer>
      <BrandContainer>
        <BrandImage
          src="/images/bosch.png"
          alt="become_a_supplier"
          width="auto"
          height="100%"
        />
        <Description>
          <TitleBadge>
            <Title>Robert Bosch GmbH</Title>
            <Badge label={"VERIFIED SUPPLIER"} icon={"verified"} />
            <Badge label={"INNOVATION"} color={"#EB2F96"} icon={"innovation"} />
          </TitleBadge>
          <Subtext>
            Aliquam a proin mauris, commodo. Vel gravida ac dictum dapibus
            praesent iaculis posuere. Elementum vulputate amet, scelerisque dis.
            Elementum in vitae, ornare arcu quis. Ultricies enim quam nisl et
            neque cursus sit. Adipiscing consectetur curabitur urna etiam
            tincidunt hac vel. Lacus urna adipiscing potenti urna sit elit.
          </Subtext>
        </Description>
      </BrandContainer>
      <PropertyContainer>Berat</PropertyContainer>
    </ResultCardContainer>
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
`;

const BrandImage = styled.img``;

const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.span`
  font-weight: 500;
  font-size: 24.1387px;
  line-height: 32px;
  color: ${(props) => props.theme.colors.black};
  margin-right: 16px;
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
`;

const Subtext = styled.div`
  font-weight: 400;
  font-size: 14.0809px;
  line-height: 22px;
  color: #8c8c8c;
  margin-top: 8px;
`;

const PropertyContainer = styled.div``;
