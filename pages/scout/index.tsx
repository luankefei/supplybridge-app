import dynamic from "next/dynamic";
import styled from "styled-components";
import Switch from "components/Switch";
import { useState } from "react";
import Script from "next/script";

const Layout = dynamic(() => import("components/Layout"));

export default function Industry() {
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
    <Layout>
      <>
        <Container onClick={openSurvey}>
          <Switch />
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
      </>
    </Layout>
  );
}

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
