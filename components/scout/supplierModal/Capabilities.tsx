import { Divider } from "@mui/material";
import styled from "styled-components";

export const CapabilitiesTabPanel = () => {
  return (
    <CapabilitiesContainer>
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
      <Divider style={{ margin: "20px 0" }} />
      <Title>Certifications</Title>
      <CertificateContainer>
        <CertificateItem>
          <CertificateTitle>
            IS09001
          </CertificateTitle>
          <CertificateDescription>
            Quality Management
          </CertificateDescription>
        </CertificateItem>
        <CertificateItem>
          <CertificateTitle>
            ISO/IEC 17025
          </CertificateTitle>
          <CertificateDescription>
            Testing and Calibration Laboratories
          </CertificateDescription>
        </CertificateItem>
      </CertificateContainer>
    </CapabilitiesContainer>
  )
}

const CapabilitiesContainer = styled.div`
  font-family: "Inter", sans-serif;
`

const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 600;

`;
const RDContainer = styled.div`
margin: 15px 0;
`;

const RDInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const RDInfoTitle = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #6B7280;
`;

const RDInfoDescription = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  text-align: right;
  color: #111827;
`;

const CertificateContainer = styled.div`

`;

const CertificateItem = styled.div`
  padding: 8px 16px;
  background: #F3F4F6;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const CertificateTitle = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #111827;
`;

const CertificateDescription = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: #6B7280;
`;