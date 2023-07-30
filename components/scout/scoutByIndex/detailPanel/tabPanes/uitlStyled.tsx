import { Stack } from "@mui/material";
import { SText } from "components/ui-components/text";
import styled from "styled-components";

export const TabPaneTextSecondary = styled(SText)`
  font-size: 14px;
  color: #9ca3af;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const TabPaneTextPrimary = styled(SText)`
  font-size: 14px;
  color: #434343;
  word-wrap: break-word;
  max-width: 250px;
`;

export const GridContainer = styled.div<{
  width?: string;
  alignItems?: string;
}>`
  display: grid;
  grid-template-columns: 250px auto; /* Adjust the width of the first column as needed */
  grid-gap: 16px; /* Adjust the gap between columns as needed */
  font-family: Ubuntu;
  font-style: normal;
  align-items: ${(props) => props.alignItems};
  width: ${(props) => props.width};
`;

export const FirstColumn = styled.div`
  font-size: 14px;
  color: #9ca3af;
  display: flex;
  align-items: flex-start;
`;

export const SecondColumn = styled.div`
  word-wrap: break-word;
  max-width: 200px;
  font-size: 14px;
  color: #434343;
  display: flex;
  align-items: center;
  overflow-wrap: break-word;
`;
