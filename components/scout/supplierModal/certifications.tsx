import { theme } from "config/theme";
import styled from "styled-components";

export const CertificationsTabPanel = () => {
  return (
    <CertificationsContainer>
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
        <CertificateItem>
          <CertificateTitle>
            ISO26262
          </CertificateTitle>
          <CertificateDescription>
            Functional Safety Standard
          </CertificateDescription>
        </CertificateItem>
      </CertificateContainer>
    </CertificationsContainer>
  )
}

const CertificationsContainer = styled.div`
  font-family: "Inter", sans-serif;
  font-style: normal;
`

const Title = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const CertificateContainer = styled.div`
  margin-top: 16px;
`;

const CertificateItem = styled.div`
  padding: 8px 16px;
  background: #F3F4F6;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const CertificateTitle = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 24px;
  color: ${theme.colors.text}
`;

const CertificateDescription = styled.div`
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 18px;
  color: #9CA3AF;
`;