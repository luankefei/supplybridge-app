import styled from "styled-components";
import React from "react";
import { Skeleton } from "@mui/material";


export default function BigCardSkeleton() {

  return (
    <>
      <CardContainer>
        <IconBackground variant="circular" />
        <Title variant="text" />
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div`
  width: 290px;
  height: 198px;

  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #FFFFFF;
  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    border: 4px solid #445B66;
    box-shadow: none;
  }
`;

const IconBackground = styled(Skeleton)`
  border-radius: 100%;
  background-color: #e6f5f5;
  width: 82px;
  height: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Skeleton)`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  margin-top: 22px;
`;
