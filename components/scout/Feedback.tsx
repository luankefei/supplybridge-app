import React from "react";
import styled from "styled-components";

const Feedback = () => {

  const handleFeedback = () => {

  }

  return (
    <Container>
      <Title>FEEDBACK</Title>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  cursor: pointer;
  right: 0px;
  top: 120px;
  width: 37px;
  height: 93px;
  background: #c41d7f;
  border-radius: 16px 0px 0px 16px;
  @media (max-width: ${(props) => props.theme.size.laptop}) {
    display: none;
  }
`;

const Title = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: flex-end;
  color: #f5f5f5;
  transform-origin: 46px 37px;
  transform: rotate(270deg);
`;

export default Feedback;