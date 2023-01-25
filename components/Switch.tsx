import { useState } from "react";
import styled from "styled-components";
import ScoutByIndex from "./scout/ScoutByIndex";
import ScoutByQuickBridge from "./scout/ScoutByQuickBridge";

export default function Switch() {
  const [selected, setSelected] = useState("byIndex")

  return (
    <Container>
      <SwitchContainer>
        <Switches>
          <Background selected={selected}></Background>
          <ByIndex selected={selected} onClick={() => setSelected("byIndex")}>Scout by Index</ByIndex>
          <ByQuickBridge selected={selected} onClick={() => setSelected("byQuickBridge")}>Scout by QuickBridge</ByQuickBridge>
        </Switches>
        <LinkContainer>
          <Icon>?</Icon>
          <Text>Help & Feedback</Text>
        </LinkContainer>
      </SwitchContainer>
      {selected === "byIndex" ?
        <ScoutByIndex /> :
        <ScoutByQuickBridge />
      }

    </Container>

  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SwitchContainer = styled.div`
  height: 56px;
  margin: 36px 0;
  display: flex;
  justify-content: space-between;
`;

const Switches = styled.div`
  width: 348px;
  height: 56px;
  background: #F9FAFB;
  border: 1px solid #D1D5DB;
  border-radius: 16px;  
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
	position: relative;
`;

const Background = styled.div<any>`
  left: ${(props) => (props.selected === "byIndex" ? "5px" : "169px")};
	top: 5;
	position: absolute;
	width: 174px;
	height: 46px;
	background: #08979C;
	border-radius: 16px;
	transition: .5s;
`;

const ByIndex = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) => (props.selected === "byIndex" ? "#fff" : "#808080")};
	cursor: pointer;
	background: transparent;
	position: relative;
  transition: .5s;
  
`;

const ByQuickBridge = styled.span<any>`
  width: 50%;
  padding: 6px 10px;
  border-radius: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${(props) => (props.selected === "byQuickBridge" ? "#fff" : "#808080")};
	cursor: pointer;
	background: transparent;
	position: relative;
  transition: .5s;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Icon = styled.div`
  color: #2C71F0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  width: 18px;
  height: 18px;
  border: 2px solid #2C71F0;
  border-radius: 100%;
`
const Text = styled.span`
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  color: #2C71F0;
`