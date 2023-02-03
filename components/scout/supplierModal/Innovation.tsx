import { Box, Divider } from "@mui/material";
import { theme } from "config/theme";
import styled from "styled-components";

export const InnovationTabPanel = () => {
  return (
    <InnovationContainer>
      <Title>R&D</Title>
      <RDContainer>
        <RDInfo>
          <RDInfoTitle>R&D Personnel:</RDInfoTitle>
          <RDInfoDescription>12,000</RDInfoDescription>
        </RDInfo>
        <RDInfo>
          <RDInfoTitle>R&D Personnel % (of total):</RDInfoTitle>
          <RDInfoDescription>40%</RDInfoDescription>
        </RDInfo>
        <RDInfo>
          <RDInfoTitle>R&D Investment in 2021(mil, USD):</RDInfoTitle>
          <RDInfoDescription>$1,184</RDInfoDescription>
        </RDInfo>
        <RDInfo>
          <RDInfoTitle>R&D Investment % (of revenue):</RDInfoTitle>
          <RDInfoDescription>7%</RDInfoDescription>
        </RDInfo>
        <RDInfo>
          <RDInfoTitle>Built-to-spec:</RDInfoTitle>
          <RDInfoDescription>Yes</RDInfoDescription>
        </RDInfo>
        <RDInfo>
          <RDInfoTitle>Built-to-print:</RDInfoTitle>
          <RDInfoDescription>Yes</RDInfoDescription>
        </RDInfo>
      </RDContainer>
      <Divider style={{ margin: "7px 0", borderColor: "transparent" }} />
      <Title>Patents</Title>
      <PatentContainer>
        <TotalPatentInfo>
          <TotalPatentTitle>Total Patents (Global)</TotalPatentTitle>
          <TotalPatentDescription>46</TotalPatentDescription>
        </TotalPatentInfo>
        <PatentItemBoxGroup>
          <PatentItemBox>
            <PattentTitle>High ionic conductivity Solid State Battery</PattentTitle>
            <PattentInfo>
              <PattentInfoTitle>Publication Number</PattentInfoTitle>
              <PattentInfoDescription>US 20224149043</PattentInfoDescription>
            </PattentInfo>
            <PattentInfo>
              <PattentInfoTitle>Publication Number</PattentInfoTitle>
              <PattentInfoDescription>US 20224149043</PattentInfoDescription>
            </PattentInfo>
            <PattentInfo>
              <PattentInfoTitle>Publication Date</PattentInfoTitle>
              <PattentInfoDescription>Aug. 13, 2021</PattentInfoDescription>
            </PattentInfo>
            <PattentInfoTitle>Many companies large and small have pledged to be carbon neutral within...,
              on the other hand, has pledged to be carbon neutral by 2040.
              Unilever, which manufactures tens of thousands of consumer goods,
              has also pledged to be carbon neutral by 2039.
            </PattentInfoTitle>
          </PatentItemBox>
          <PatentItemBox1>
          </PatentItemBox1>
          <PatentItemBox2>
          </PatentItemBox2>
        </PatentItemBoxGroup>
      </PatentContainer>
    </InnovationContainer>
  )
}

const InnovationContainer = styled.div`
  font-family: "Inter", sans-serif;
  font-style: normal;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const RDContainer = styled.div`
  margin: 16px 0;
`;

const RDInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 0.875rem;
`;

const RDInfoTitle = styled.span`
  color: #9CA3AF;
`;

const RDInfoDescription = styled.span`
  text-align: right;
  color: ${theme.colors.text}
`;

const PatentContainer = styled.div`
  margin-top: 24px 16px;
`;

const TotalPatentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin 16px 0px;
  font-weight: 500;
  font-size: 0.875rem;
`;

const TotalPatentTitle = styled.span`
  color: #9CA3AF;
`;

const TotalPatentDescription = styled.span`
  text-align: right;
  color: ${theme.colors.text}
`;

const PatentItemBoxGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const PatentItemBox = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
  margin-left: 0px;
  margin-top: 8px;
  margin-bottom: 0px;
  margin-right: 0px;
  padding: 14px 16px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 3;
  font-weight: 500;
  font-size: 0.875rem;
`;

const PatentItemBox1 = styled(Box)`
  grid-row-start: 1;
  grid-column-start: 1;
  margin-left: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-right: -4px;
  width: var(--patent-item-box);
  padding: 14px 16px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 2;
`;

const PatentItemBox2 = styled(Box)`
  grid-row-start: 1;
  grid-column-start: 1;
  margin-left: 8px;
  margin-top: 0px;
  margin-bottom: 8px;
  margin-right: -8px;
  padding: 14px 16px;
  background: #F3F4F6;
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1;
`;

const PattentTitle = styled.div`
  color: ${theme.colors.text}
`;

const PattentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const PattentInfoTitle = styled.span`
  color: #9CA3AF;
`;

const PattentInfoDescription = styled.span`
  text-align: right;
  color: ${theme.colors.text}
`;


