import styled from "styled-components";

export const SpacingVertical = styled.div<{ space: string }>`
  height: ${(props) => props.space};
`;
export const SpacingHorizontal = styled.div<{ space: string }>`
  width: ${(props) => props.space};
`;
