import Icon from "components/Icon";
import styled from '@emotion/styled'
import SliderCard from "../SliderCard";
import { Button } from "@mui/material";

export default function Slide2() {
  return (
    <SliderCard>
      <Container>
        <FileUploadContainer>
          <Icon src="cloud" width={80} height={54} />
          <Paragraph>
            You can drag & drop files here <br />
            and we will take care of the rest
          </Paragraph>

          <StyledButton disabled>Upload CAD Files</StyledButton>

          <FileUploadNoteContainer>
            <Icon src="shield-check" width={24} height={24} />
            <NoteParagraph>
              All your uploads will be secure and confidential.
            </NoteParagraph>
          </FileUploadNoteContainer>
        </FileUploadContainer>
      </Container>
    </SliderCard>
  );
}

const Container = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  gap: 20px;
`;

const FileUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 54px 0px;
  gap: 30px;
  width: 100%;
  height: 466px;
  background: #f3f4f6;
  border: 1px dashed #d1d5db;
  border-radius: 16px;
`;

const Paragraph = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #595959;
`;

const StyledButton = styled(Button)`
  background-color: #08979C;
  border-radius: 100px;
  width: 240px;
  height: 44px;
  color: #ffffff !important;
  font-family: "Inter";
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  text-transform: capitalize;
`;

const FileUploadNoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 432px;
  height: 64px;
  padding-left: 20px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  gap: 10px;
`;

const NoteParagraph = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: #65808c;
`;
