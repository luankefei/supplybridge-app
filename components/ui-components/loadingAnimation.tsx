import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";

type Props = { showType?: string };

const LoadingAnimation = ({ showType }: Props) => {
  const boxClassName = showType === "long" ? "box" : "box-short";
  /*
  const stopAnimationTime = showType === "long" ? 6000 : 2900;
  const startAnimationTime = showType === "long" ? 1200 : 500;
  */
  const stopAnimationTime = showType === "long" ? 6000 : 2900;
  const startAnimationTime = showType === "long" ? 1200 : 500;
  const [currentText, setCurrentText] = useState("");
  const texts = [
    "Scouting Started",
    "AI Fetching Data",
    "AI Preparing Data",
    "Almost There",
    "Supply Bridge Hooray! 🎉",
  ];

  const balloonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

    const startAnimation = () => {
      interval = setInterval(() => {
        setCurrentText(texts[currentIndex]);
        currentIndex = (currentIndex + 1) % texts.length;
      }, startAnimationTime);
    };

    const stopAnimation = () => {
      clearInterval(interval);
    };

    const getRandomStyles = (
      containerWidth: number,
      containerHeight: number
    ): string => {
      const r = random(255);
      const g = random(255);
      const b = random(255);
      const mt = random(containerHeight - 30); // Adjust the value as per your requirement
      const ml = random(containerWidth - 30); // Adjust the value as per your requirement
      const dur = random(5) + 5;
      return `
        background-color: rgba(${r},${g},${b},0.7);
        color: rgba(${r},${g},${b},0.7);
        box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${
        b - 10
      },0.7);
        margin: ${mt}px 0 0 ${ml}px;
        animation: float ${dur}s ease-in infinite;
      `;
    };
    const createBalloons = (num: number) => {
      if (balloonContainerRef.current) {
        const balloonContainer = balloonContainerRef.current;
        const containerWidth = balloonContainer.offsetWidth;
        const containerHeight = balloonContainer.offsetHeight;

        for (let i = num; i > 0; i--) {
          const balloon = document.createElement("div");
          balloon.className = "balloon";
          balloon.style.cssText = getRandomStyles(
            containerWidth,
            containerHeight
          );
          balloonContainer.appendChild(balloon);
        }
      }
    };

    const removeBalloons = () => {
      if (balloonContainerRef.current) {
        const balloonContainer = balloonContainerRef.current;
        setTimeout(() => {
          balloonContainer.style.opacity = "0";
          balloonContainer.remove();
        }, 3000);
      }
    };

    startAnimation();
    const celebrateWithChance = (chance: number) => {
      const randomNum = Math.floor(Math.random() * chance) + 1;
      if (randomNum === 1) {
        // createBalloons(2);
        /*
        party.confetti(document.body, {
          count: party.variation.range(100, 150),
        });
        */
      }
    };
    const timeout = setTimeout(() => {
      stopAnimation();
      if (showType === "long") {
        // celebrateWithChance(1);
        // removeBalloons();
      }
    }, stopAnimationTime);
    return () => {
      clearTimeout(timeout);
      stopAnimation();
    };
  }, []);

  const random = (num: number): number => {
    return Math.floor(Math.random() * num);
  };

  return (
    <div
      style={{
        background: "#1F2022",
        opacity: "0.8",
        width: "380px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "18px",
        paddingLeft: "28px",
        paddingRight: "20px",
        paddingBottom: "60px",
      }}
    >
      <div className={"grid"}>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div className={boxClassName}></div>
        <div
          className={
            showType === "long" ? "zigzag_inner" : "zigzag_inner_short"
          }
        ></div>
        <div
          className={
            showType === "long" ? "zigzag_inner_two" : "zigzag_inner_short_two"
          }
        ></div>
        <div
          className={
            showType === "long"
              ? "zigzag_inner_three"
              : "zigzag_inner_short_three"
          }
        ></div>
        <div
          className={
            showType === "long"
              ? "zigzag_inner_fourth"
              : "zigzag_inner_short_fourth"
          }
        ></div>
        <div
          className={showType === "long" ? "zigzag_left" : "zigzag_left_short"}
        ></div>
        <div
          className={
            showType === "long" ? "zigzag_left_two" : "zigzag_left_short_two"
          }
        ></div>
        <div
          className={
            showType === "long"
              ? "zigzag_left_three"
              : "zigzag_left_short_three"
          }
        ></div>
        <div
          className={
            showType === "long" ? "zigzag_left_four" : "zigzag_left_short_four"
          }
        ></div>
        <div
          className={
            showType === "long" ? "zigzag_right" : "zigzag_right_short"
          }
        ></div>
        <div
          className={
            showType === "long" ? "zigzag_right_two" : "zigzag_right_short_two"
          }
        ></div>
        <div
          className={
            showType === "long"
              ? "zigzag_right_three"
              : "zigzag_right_short_three"
          }
        ></div>
        <div
          className={
            showType === "long"
              ? "zigzag_right_four"
              : "zigzag_right_short_four"
          }
        ></div>
      </div>

      <div id="balloon-container" ref={balloonContainerRef}></div>
      <div
        style={{
          marginTop: "13rem",
          marginRight: "0.67rem",
          paddingLeft: "0.5rem",
        }}
      >
        {/* <span className="loading-text">{currentText}</span> */}
        <span className="animation-text">{currentText}</span>
      </div>
    </div>
  );
};

export default LoadingAnimation;

export const LoadingWithBackgroundOverlay = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          // floating loading
          alignItems: "center",
          justifyContent: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      >
        <LoadingAnimation showType="short" />
      </Box>
    </Box>
  );
};
