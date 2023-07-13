import styled from "styled-components";
import Switch from "components/Switch";
import { useState } from "react";
import Survicate from "components/Survicate";
import StorageService from "services/storage";
import { useAuth } from "requests/useAuth";
import Layout from "components/Layout";

export default function Industry() {
  const [loadSurvey, setLoadSurvey] = useState(false);
  const { updateAccount } = useAuth();

  const handleSurvicate = () => {
    if (
      StorageService.getSurveyCount() >= 2 ||
      StorageService.getSurveyDisplayed()
    ) {
      return;
    }
    setLoadSurvey(true);
  };

  const handleCloseSurvicate = () => {
    setLoadSurvey(false);
    const scriptElement = document.getElementById("show-banner");
    scriptElement?.parentNode?.removeChild(scriptElement);
    const survicateBox = document.getElementById("survicate-box");
    survicateBox?.parentElement?.removeChild(survicateBox);
    StorageService.setSurveyDisplayed();
    updateAccount({ surveyPopupCount: StorageService.getSurveyCount() + 1 });
  };

  return (
    <Layout>
      <Container onClick={handleSurvicate}>
        <Survicate loadSurvey={loadSurvey} onClose={handleCloseSurvicate} />
        <Switch />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
