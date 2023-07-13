import { Button } from "@mui/material";
import styled from "@emotion/styled";
import Box from "../IconBox";
import SliderCard from "../SliderCard";
import { useState } from "react";
import BigCard from "components/scout/ScoutByQuickBridge/BigCard";

export default function Slide1() {
  const [isChecked, setChecked] = useState(0);
  return (
    <SliderCard>
      <Container>
        <TextContainer>
          <Title>What application will you be Sourcing for today?</Title>
          <SuTitle>Please choose one option</SuTitle>
        </TextContainer>
        <BoxContainer>
          <Row>
            <BigCard src="prototype-colored" title="Prototype" selected />
            <BigCard src="production" title="Series Production" />
          </Row>
          <Row>
            <BigCard src="spare-parts-colored" title="Spare parts" />
            <BigCard src="tooling" title="Tooling & Manufacturing Aids" />
          </Row>
        </BoxContainer>

        <StyledButton disabled>Continue</StyledButton>
      </Container>
    </SliderCard>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  width: 50%;
  height: 100%;
`;
const TextContainer = styled.div`
  width: 100%;
  margin: 20px 0px 0px 80px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;
const SuTitle = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #4b5563;
  margin-top: 8px;
`;
const BoxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #08979c;
  border-radius: 100px;
  width: 604px;
  height: 44px;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;
`;
