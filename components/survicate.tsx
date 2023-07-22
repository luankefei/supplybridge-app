import React, { useEffect, useState } from "react";
import Script from "next/script";
import console from "utils/console";

interface Props {
  loadSurvey: boolean,
  onClose: () => void
}

const Survicate = (props: Props) => {
  const { loadSurvey, onClose } = props;

  const openSurvey = () => {
    //@ts-ignore
    if (window._sva) {
      //@ts-ignore
      var _sva = window._sva;
      _sva.destroyVisitor();
      _sva.addEventListener('survey_completed', function () {
        onClose();
      });
      _sva.addEventListener('survey_closed', function () {
        onClose();
      });
      var options = {
        forceDisplay: true,
        displayMethod: 'immediately',
      };

      _sva.showSurvey("6ee2160548399c3c");
      console.log("request to show sva", options);
    }
  };

  useEffect(() => {
    window.addEventListener("SurvicateReady", function () {
      console.log("survicate is ready");
    });
    if (loadSurvey) {
      openSurvey();
    }

  }, [loadSurvey, openSurvey]);

  return (
    <>
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
    </>
  );
};



export default Survicate;