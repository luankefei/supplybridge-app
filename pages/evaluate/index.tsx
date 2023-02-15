import React, { useState } from "react";
import styled, { css } from "styled-components";
import Icon from "components/Icon";
import Layout from "components/Layout";
import Header from "components/NewHeader";
import BigCard from "components/scout/ScoutByQuickBridge/BigCard";
interface IconProps {
  title: string;
  iconSrc: string;
  iconWidth?: number;
  iconHeight?: number;
  padding?: string;
  margin?: string;
  ischecked: boolean;
  onClick: React.MouseEventHandler;
  disabled: boolean;
}

export default function Evaluate() {
  const [isChecked, setChecked] = useState(0);
  const disabled = true;
  return (
    <Layout>
      <Header></Header>
      <Container>
        <BigCard
          src={disabled ? "disabled-analysis" : "analysis"}
          title="Should Cost Analysis"
          selected={isChecked === 0}
          disabled={disabled}
          onClick={() => setChecked(0)}
        />
        <BigCard
          src={disabled ? "disabled-assessment" : "assessment"}
          title="Risk Assessment"
          selected={isChecked === 1}
          disabled={disabled}
          onClick={() => setChecked(1)}
        />
        <BigCard
          src={disabled ? "disabled-rating" : "rating"}
          title="ESG Rating"
          selected={isChecked === 2}
          disabled={disabled}
          onClick={() => setChecked(2)}
        />
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width: 100%;
  height: 75vh;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin: 10px 10px;
  }
  @media (max-width: ${(props) => props.theme.size.mobileXl}) {
    flex-direction: column;
  }
`;