import React, { useEffect } from "react";
import party from "party-js";
type Props = { showType?: string;};

export default function LoadingAnimation({ showType }: Props) {
  const boxClassName = showType === "long" ? "box" : "box-short";

  function celebrateWithChance(chance: number): void {
    const randomNum = Math.floor(Math.random() * chance) + 1;
    if (randomNum === 1) {
      // celebrate effect
      party.confetti(document.body);
    }
  }
  if (showType === "long") {
    setTimeout(() => {  
      //1in5 chance
      celebrateWithChance(5);
    }, 7000);
  }

  return (
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
        className={showType === "long" ? "zigzag_inner" : "zigzag_inner_short"}
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_inner_two" : "zigzag_inner_short_two"
        }
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_inner_three" : "zigzag_inner_short_three"
        }
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_inner_fourth" : "zigzag_inner_short_fourth"
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
          showType === "long" ? "zigzag_left_three" : "zigzag_left_short_three"
        }
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_left_four" : "zigzag_left_short_four"
        }
      ></div>
      <div
        className={showType === "long" ? "zigzag_right" : "zigzag_right_short"}
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_right_two" : "zigzag_right_short_two"
        }
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_right_three" : "zigzag_right_short_three"
        }
      ></div>
      <div
        className={
          showType === "long" ? "zigzag_right_four" : "zigzag_right_short_four"
        }
      ></div>
    </div>
  );
}