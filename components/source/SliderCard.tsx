import * as React from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
interface Props {
  children: any;
}

export default function SliderCard({ children }: Props) {
  return <StyledCard>{children}</StyledCard>;
}

const StyledCard = styled(Card)`
   width: 100%;
  height: 724px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 16px;
  margin: 20px auto;
  background-color: #F3F4F6;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: ${(props) => props.theme.size.laptop}) {
    margin: 0px auto;
  }
  
`;
