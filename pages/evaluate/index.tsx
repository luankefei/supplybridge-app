import React, { useState } from "react";
import styled, { css } from "styled-components";
import Icon from "components/Icon";
import Layout from "components/Layout";
import Header from "components/NewHeader";
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
  const disabled=true;
  return (
    <Layout>
      <Header></Header>
      <Container>
        <IconBox
          iconSrc={disabled? "disabled-analysis": "analysis"}
          iconWidth={82}
          iconHeight={82}
          title="Should Cost Analysis"
          ischecked={isChecked === 0}
          disabled={disabled}
          onClick={() => setChecked(0)}
        />
        <IconBox
          iconSrc={disabled? "disabled-assessment": "assessment"}
          iconWidth={82}
          iconHeight={82}
          title="Risk Assessment"
          ischecked={isChecked === 1}
          disabled={disabled}
          onClick={() => setChecked(1)}
        />
        <IconBox
          iconSrc={disabled? "disabled-rating" : "rating"}
          iconWidth={82}
          iconHeight={82}
          title="ESG Rating"
          ischecked={isChecked === 2}
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

const IconBox = ({
  title,
  iconSrc,
  iconHeight = 120,
  iconWidth = 120,
  padding = "25px",
  margin = "0px",
  ischecked = false,
  disabled,
  onClick,
}: IconProps) => {
  return !disabled ? (
    <StyledBox
      ischecked={ischecked}
      padding={padding}
      margin={margin}
      onClick={onClick}
    >
      <BoxInfo>
        <Icon src={iconSrc} width={iconWidth} height={iconHeight} />
        <Title>{title}</Title>
      </BoxInfo>
    </StyledBox>
  ) : (
    <StyledBoxDisabled
      ischecked={ischecked}
      padding={padding}
      margin={margin}
      onClick={onClick}
    >
        <BoxInfo>
        <Icon src={iconSrc} width={iconWidth} height={iconHeight} />
        <Title>{title}</Title>
      </BoxInfo>
    </StyledBoxDisabled>
  );
};

const StyledBox = styled.div<{
  ischecked: boolean;
  padding: string;
  margin: string;
}>`
  width: 290px;
  height: 196px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: ${(props) => `${props.padding}`};
  margin: ${(props) => `${props.margin}`};
  border-radius: 16px;
  background-color: #ffffff;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border: ${(props) =>
    props.ischecked ? "4px solid #08979c" : "1px solid #E5E7EB;"};
  &:hover {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.18);
  }
  &:active {
    border: 4px solid #445b66;
  }
  img {
    cursor: pointer;
  }
`;

const StyledBoxDisabled = styled(StyledBox)<{
  ischecked: boolean;
  padding: string;
  margin: string;
}>`
  background: #f3f4f6;
  color: #808080;
  border: ${(props) =>
  props.ischecked ? "4px solid #b3b3b3;" : "1px solid #E5E7EB;"};    
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);

  pointer-events: none;
`;

const BoxInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;
  margin-top: 25px;
`;

const Title = styled.h4`
  text-transform: capitalize;
  font-family: Inter;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
  }
  @media (max-width: ${(props) => props.theme.size.tablet}) {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
`;
