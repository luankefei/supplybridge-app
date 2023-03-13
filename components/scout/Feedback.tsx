import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Script from "next/script";
import { useAuth } from "requests/useAuth";
import StorageService from "services/storage";
const Feedback = () => {
  const [loadSurvey, setLoadSurvey] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { updateAccount } = useAuth();

  const handleFeedback = () => {
    if (StorageService.getSurveyCount() >= 2 || StorageService.getSurveyDisplayed()) {
      return;
    }
    setLoadSurvey(true);
  }


  const setAttributes = () => {
    setDisabled(false);
  }

  const openSurvey = () => {
    console.log('not returned');
    //@ts-ignore
    if (window._sva) {
      //@ts-ignore
      var _sva = window._sva;
      _sva.destroyVisitor();
      _sva.addEventListener('survey_completed', function () {
        updateSurveyStatus();
      });
      _sva.addEventListener('survey_closed', function () {
        updateSurveyStatus();
      });
      var options = {
        forceDisplay: true,
        displayMethod: 'immediately',
      };

      _sva.showSurvey("6ee2160548399c3c");
      console.log("request to show sva", options);
    }
  };

  const updateSurveyStatus = () => {
    setLoadSurvey(false);
    const scriptElement = document.getElementById("show-banner")
    scriptElement?.parentNode?.removeChild(scriptElement);
    const survicateBox = document.getElementById("survicate-box");
    survicateBox?.parentElement?.removeChild(survicateBox);
    StorageService.setSurveyDisplayed();
    updateAccount({ surveyPopupCount: StorageService.getSurveyCount() + 1 });
  }

  useEffect(() => {
    window.addEventListener("SurvicateReady", setAttributes);
    if (loadSurvey) {
      openSurvey();
    }

  }, [loadSurvey, openSurvey]);

  return (
    <Container disabled={disabled} onClick={handleFeedback}>
      <Title>FEEDBACK</Title>
      {(
        <Script
          id="show-banner"
          dangerouslySetInnerHTML={{
            __html: `(function (w) {
            var s = document.createElement('script');
            s.src = 'https://survey.survicate.com/workspaces/620e68731afc32f60656d1a47c0aa32b/web_surveys.js';
            s.async = true;
            var e = document.getElementsByTagName('script')[0];
            e.parentNode.insertBefore(s, e);
          })(window);`,
          }}
        />
      )}
    </Container>
  );
};

const Container = styled.div<{ disabled: boolean }>`
  pointer-events: ${props => props.disabled ? "none" : "auto"};
  position: fixed;
  cursor: pointer;
  right: 0px;
  top: 120px;
  width: 37px;
  height: 93px;
  background: ${props => props.disabled ? "#c41d7f80" : "#c41d7f"};
  border-radius: 16px 0px 0px 16px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const Title = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: flex-end;
  color: #f5f5f5;
  transform-origin: 46px 37px;
  transform: rotate(270deg);
`;

export default Feedback;