import { Input, TextField } from "@mui/material";
import { theme } from "config/theme";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

export const Ratings = () => {
  const [value, setValue] = useState<any>(93.4);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event?.target.value) * 20);
  };

  return (
    <RatingsContainer>
      <Title>Score</Title>
      <ProgressBarContainer>
        <ProgressBar value={value}></ProgressBar>
        <Score>
          <ScoreValue>{value / 20}</ScoreValue>
          <ScoreMaxValue> / 5</ScoreMaxValue>
        </Score>
        <ScoreText>Overall</ScoreText>
      </ProgressBarContainer>
      <ScoreList>
        <ScoreInfo>
          <ScoreTitle>Cost / Performance Rating</ScoreTitle>
          <ScoreDescription>4.8</ScoreDescription>
        </ScoreInfo>
        <ScoreInfo>
          <ScoreTitle>Flexibility, Agility & Speed</ScoreTitle>
          <ScoreDescription>3.8</ScoreDescription>
        </ScoreInfo>
        <ScoreInfo>
          <ScoreTitle>Growth Potential</ScoreTitle>
          <ScoreDescription>4.0</ScoreDescription>
        </ScoreInfo>
        <ScoreInfo>
          <ScoreTitle>Innovation Rating</ScoreTitle>
          <ScoreDescription>4.3</ScoreDescription>
        </ScoreInfo>
        <ScoreInfo>
          <ScoreTitle>ESG Sustainability Rating</ScoreTitle>
          <ScoreDescription>3.5</ScoreDescription>
        </ScoreInfo>
        <ScoreInfo>
          <ScoreTitle>Compatibility Score</ScoreTitle>
          <ScoreDescription>3.6</ScoreDescription>
        </ScoreInfo>
      </ScoreList>
    </RatingsContainer>
  );
};

const RatingsContainer = styled.div`
  font-family: "Inter", sans-serif;
`;

const Title = styled.div`
  margin-bottom: 24px;
  font-weight: 600;
  font-size: 1rem;
  color: ${theme.colors.text};
`;

const breatheAnimation = keyframes`
  0% { --percentage: 0; };
  100% { --percentage: {var(--value)}}
`;

const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ProgressBar = styled.div<any>`
  --value: ${(props) => props.value};
  --percentage: ${(props) => props.value};
  --primary: #24a3a7;
  --secondary: #f3f4f6;
  /* animation: ${breatheAnimation} 2s 0.5s forwards; */
  width: 200px;
  aspect-ratio: 2 / 1;
  border-radius: 50% / 100% 100% 0 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from 0.75turn at 50% 100%,
      var(--primary) calc(var(--percentage) * 1% / 2),
      var(--secondary) calc(var(--percentage) * 1% / 2 + 0.1%)
    );
    mask: radial-gradient(at 50% 100%, white 65%, transparent 65.5%);
    mask-mode: alpha;
    -webkit-mask: radial-gradient(at 50% 100%, #0000 65%, #000 65.5%);
    -webkit-mask-mode: alpha;
    border: var(--border);
  }
`;

const Score = styled.span`
  position: absolute;
  bottom: 20px;
`;

const ScoreValue = styled.span`
  color: #24a3a7;
  font-weight: 400;
  font-size: 32px;
`;

const ScoreMaxValue = styled.span``;

const ScoreText = styled.span`
  position: absolute;
  bottom: 0;
  font-size: 16px;
  line-height: 19px;
  color: #9ca3af;
`;

const ScoreList = styled.div`
  margin-top: 24px;
  padding: 0 21.5px;
`;

const ScoreInfo = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const ScoreTitle = styled.span`
  font-size: 14px;
  line-height: 17px;
  color: #9ca3af;
`;

const ScoreDescription = styled.span`
  font-size: 14px;
  line-height: 17px;
  color: ${theme.colors.text};
`;
