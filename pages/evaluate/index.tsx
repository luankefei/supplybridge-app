import { useState } from "react";
import styled from "styled-components";
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
}

export default function Evaluate() {
  return (
    <Layout>
      <Header></Header>
      <Container>
        <IconBox
          iconSrc="analysis"
          iconWidth={82}
          iconHeight={82}
          title="Should Cost Analysis"
        />
        <IconBox
          iconSrc="assessment"
          iconWidth={82}
          iconHeight={82}
          title="Risk Assessment"
        />
        <IconBox
          iconSrc="rating"
          iconWidth={82}
          iconHeight={82}
          title="ESG Rating"
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
}: IconProps) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <StyledBox
      ischecked={isChecked}
      padding={padding}
      onClick={() => setChecked(!isChecked)}
      margin={margin}
    >
      <BoxInfo>
        <Icon src={iconSrc} width={iconWidth} height={iconHeight} />
        <Title>{title}</Title>
      </BoxInfo>
    </StyledBox>
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
  background-color: #ffffff;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border: ${(props) =>
    props.ischecked ? "2px solid #08979c" : "1px solid #E5E7EB;"};
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
