import styled from '@emotion/styled'
import SliderCard from "../SliderCard";
import { Button, ButtonGroup } from "@mui/material";
import Icon from "components/Icon";
import Image from "next/image";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";

export default function Slide3() {
  const [selectedValue, setSelectedValue] = useState("c");
  const [groupSelectedValue, setGroupSelectedValue] = useState("mm");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <SliderCard>
      <Container>
        <CardHeader>
          <Title>Sample Quote</Title>
          <HeaderRow>
            <Label>
              Injection Molding
              <SubLabel>(3 Parts)</SubLabel>{" "}
              <Icon src="chewron-up" width={24} height={24} />
            </Label>
            <ButtonContainer>
              <StyledButton bgcolor="#FAFAFA" textcolor="#006D75">
                QUOTE OPTIONS
              </StyledButton>
              <StyledButton bgcolor="#FA541C" textcolor="#FFFFFF">
                CHECKOUT NOW
              </StyledButton>
            </ButtonContainer>
          </HeaderRow>
        </CardHeader>
        <CardBody>
          <QuoteDetail>
            <Column width={20} justifycontent="start">
              <Image
                src="/images/sample-quote.png"
                width={144}
                height={144}
                alt="sample quote image"
              />
            </Column>
            <Column width={30} justifycontent="end">
              <ItemName>IV Flow Control.step</ItemName>
              <ItemFeature>1390-1918-001</ItemFeature>
              <ItemFeature>Current Revision: 123</ItemFeature>
              <ItemFeature>Mold Life: Limited</ItemFeature>
              <ItemFeature>Cavity Count: 1</ItemFeature>
              <ItemFeature>ABS: Lustran 348 (Natural)</ItemFeature>
              <ItemFeature>
                Color: Natural (Original Material Color)
              </ItemFeature>
            </Column>
            <Column width={30} justifycontent="end">
              <ItemFeature>Cosmetic: PM-FO</ItemFeature>
              <ItemFeature>Non-Cosmetic: PM-FO</ItemFeature>
              <ItemFeature>Dimensions: 2204.31mm x 475.01mm</ItemFeature>
              <ItemFeature>Machining Tolerance: +/- 0.076mm</ItemFeature>
              <ItemFeature>Material Tolerance: +/- 0.002mm</ItemFeature>
              <ItemFeature>
                Units:{" "}
                <RadioGroup row value={groupSelectedValue}>
                  <FormControlLabel
                    value="mm"
                    control={<StyledRadio />}
                    label="mm"
                    onClick={() => setGroupSelectedValue("mm")}
                  />
                  <FormControlLabel
                    value="in"
                    control={<StyledRadio />}
                    label="in"
                    onClick={() => setGroupSelectedValue("in")}
                  />
                </RadioGroup>
              </ItemFeature>
            </Column>
            <Column width={20} justifycontent="end">
              <StyledButton bgcolor="#08979C" textcolor="#FFFFFF">
                VIEW ANALYSIS
              </StyledButton>
              <StyledButton bgcolor="#FAFAFA" textcolor="#006D75">
                CONFIGURE PART
              </StyledButton>
              <StyledButton bgcolor="#FAFAFA" textcolor="#006D75">
                UPLOAD REVISION
              </StyledButton>
              <StyledButton bgcolor="#FAFAFA" textcolor="#006D75">
                PART OPTIONS
              </StyledButton>
            </Column>
          </QuoteDetail>
          <Line />
          <DateDetail>
            <ItemFeature>Order By: Wed 6:00 AM</ItemFeature>

            <ItemFeature>
              Receive By: <DateLabel>Thu, Dec 29</DateLabel>
            </ItemFeature>

            <RadioCardContainer>
              <RadioButtonCard isselected={selectedValue === "a"}>
                <StyledRadio
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                />
                <LabelsContainer>
                  <DateLabel>Wed, Dec 21</DateLabel>
                  <ItemFeature>+ $2,000.00</ItemFeature>
                </LabelsContainer>
              </RadioButtonCard>

              <RadioButtonCard isselected={selectedValue === "b"}>
                <StyledRadio
                  checked={selectedValue === "b"}
                  onChange={handleChange}
                  value="b"
                />
                <LabelsContainer>
                  <DateLabel>Fri, Dec 23</DateLabel>
                  <ItemFeature>+ $1,360.00</ItemFeature>
                </LabelsContainer>
              </RadioButtonCard>

              <RadioButtonCard isselected={selectedValue === "c"}>
                <StyledRadio
                  checked={selectedValue === "c"}
                  onChange={handleChange}
                  value="c"
                />
                <LabelsContainer>
                  <DateLabel>Thu, Dec 29</DateLabel>
                </LabelsContainer>
              </RadioButtonCard>
            </RadioCardContainer>
          </DateDetail>

          <CardFooter>
            <StyledButtonGroup
              variant="outlined"
              aria-label="outlined button group"
            >
              <Button>
                <Icon src="minus" width={24} height={24} />
              </Button>
              <Button disabled>25</Button>
              <Button>
                <Icon src="plus" width={24} height={24} />
              </Button>
            </StyledButtonGroup>

            <AmountLabel>$8,063.25</AmountLabel>
          </CardFooter>
        </CardBody>
      </Container>
    </SliderCard>
  );
}

const Container = styled.div`
  width: 87%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  display: flex;
  align-items: center;
  color: #2a3840;
`;
const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 32px;
  color: #1a1a1a;
`;

const SubLabel = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #65808c;
  margin-left: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;
const StyledButton = styled(Button)<{ bgcolor: string; textcolor: string }>`
  background-color: ${(props) => props.bgcolor};
  border-radius: 100px;
  width: 166px;
  height: 44px;
  color: ${(props) => props.textcolor};
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  text-transform: capitalize;
  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const HeaderRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardBody = styled.div`
  width: 931px;
  height: 527px;
  background: #fafafa;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const CardFooter = styled.div`
  width: 100%;
  height: 78px;
  background: #f0f0f0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

const QuoteDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 24px 20px;
`;
const Column = styled.div<{ width: number; justifycontent: string }>`
  flex: 1 1 ${(props) => `${props.width}%`};
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifycontent};
  gap: 10px;
  height: 100%;
`;

const ItemName = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #434343;
`;

const ItemFeature = styled.label`
  display: flex;
  justify-content: start;
  align-items: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #434343;
  gap: 10px;
`;

const StyledRadio = styled(Radio)`
  margin-left: 10px;
  padding: 0px 9px !important;
  &.Mui-checked {
    color: #08979C;
  }
`;
const DateDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 20px;
`;
const RadioButtonCard = styled.div<{ isselected: boolean }>`
  width: 157px;
  height: 72px;
  background: #fafafa;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: ${(props) => (props.isselected ? "1px solid #08979C" : "")};
`;
const LabelsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
const DateLabel = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #08979c;
`;

const RadioCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-top: 10px;
`;

const StyledButtonGroup = styled(ButtonGroup)`
  background-color: #fafafa;
  &.MuiButtonGroup-outlined {
    border-radius: 16px !important;
  }
  button {
    border-radius: 16px;
    border: 1px solid #d9d9d9;

    &.Mui-disabled {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      color: #434343;
    }
  }
`;

const AmountLabel = styled.h4`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #08979c;
`;

const Line = styled.hr`
  border: 1px solid #8c8c8c;
  width: 98%;
  margin-left: 20px;
`;
