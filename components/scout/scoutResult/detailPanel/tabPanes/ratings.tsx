import { Box, Stack } from "@mui/material";
import { TSupplierModel } from "models/supplier";
import {
  FirstColumn,
  GridContainer,
  SecondColumn,
  TabPaneTextSecondary,
} from "./uitlStyled";

/**
 * Our dedicated rating component
 * - score / 5
 */
const HalfCircleChart = ({ score }: { score: number }) => {
  const calculatePathData = (score: number) => {
    const maxScore = 5;
    const radius = 100;
    const centerX = 104;
    const centerY = 110;
    const circumference = 2 * Math.PI * radius;
    const fraction = score / maxScore;
    const arcLength = fraction * circumference;
    const startAngle = -180; // Starting angle, assuming 0 score starts at -90 degrees
    const endAngle = startAngle + (arcLength / circumference) * 180; // Calculate end angle

    // Calculate start and end points on the circle
    const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
    const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
    const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
    const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

    // Generate the path data
    const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${
      arcLength > circumference ? 1 : 0
    } 1 ${endX} ${endY}`;

    return pathData;
  };
  const pathData = calculatePathData(score);

  return (
    <svg width="200" height="110" viewBox="0 0 220 110" fill="none">
      <path
        d="M 4 110 A 100 100 0 0 1 204 110"
        stroke="#E5E7EB"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={pathData}
        stroke="#08979C"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <text
        x={104}
        y={70}
        fill="#434343"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan fontWeight="bold" fontSize={32} fill="#08979C">
          {score}
        </tspan>
        <tspan fontSize={16}> / 5 </tspan>
      </text>
      <text
        x={104}
        y={110}
        fill="#9CA3AF"
        fontSize={14}
        textAnchor="middle"
        fontFamily="Ubuntu"
      >
        Overall
      </text>
    </svg>
  );
};
/**
 * The Rating component, less fancy
 */
const Ratings = ({ data }: { data: TSupplierModel }) => {
  return (
    <Stack>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box>
          <HalfCircleChart score={4.67} />
        </Box>
        <Stack flex={3}>
          <GridContainer>
            <FirstColumn>Cost / Performance Rating</FirstColumn>
            <SecondColumn>4.8</SecondColumn>
            <FirstColumn>Flexibility, Agility & Speed</FirstColumn>
            <SecondColumn>4.8</SecondColumn>
            <FirstColumn>Growth Potential</FirstColumn>
            <SecondColumn>4.0</SecondColumn>
            <FirstColumn>Innovation Rating</FirstColumn>
            <SecondColumn>5</SecondColumn>
            <FirstColumn>ESG Sustainability Rating</FirstColumn>
            <SecondColumn>3.5</SecondColumn>
            <FirstColumn>Compatibility Score</FirstColumn>
            <SecondColumn>4</SecondColumn>
          </GridContainer>
        </Stack>
        <img
          src="icons/unlock-features.svg"
          style={{
            position: "absolute",
            backdropFilter: "blur(4px)",
            width: "100%",
          }}
        />
      </Stack>
    </Stack>
  );
};
export default Ratings;
