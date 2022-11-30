import React, { useState } from "react";
import styled from "styled-components";
import Script from "next/script";

export const Feedback = () => {
  const [loadSurvey, setLoadSurvey] = useState(false);

  const openSurvey = () => {
    if (loadSurvey) {
      //@ts-ignore
      if (window._sva) {
        //@ts-ignore
        window._sva.destroyVisitor();
        //@ts-ignore
        window._sva.showSurvey("6ee2160548399c3c");
      }
    } else {
      setLoadSurvey(true);
    }
  };
  return (
    <Container onClick={openSurvey}>
      <Title>FEEDBACK</Title>
      {loadSurvey ? (
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
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  cursor: pointer;
  right: 0px;
  top: 120px;
  width: 37px;
  height: 93px;
  background: #c41d7f;
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
