import { Divider } from "@mui/material";
import styled from "styled-components";

export const SpacingVertical = styled.div<{ space: string }>`
  height: ${(props) => props.space};
`;
export const SpacingHorizontal = styled.div<{ space: string }>`
  width: ${(props) => props.space};
`;

/**
 * A divider with spacing
 * space is automatically doubled, as it is applied to both sides
 * ```ts
 * <SpacingDivider space="20px" /> // by default, orientation is horizontal
 * <SpacingDivider space="20px" orientation="vertical" />
 * ```
 *
 */
export const SpacingDivider = styled(Divider)<{ space: string }>`
  && {
    ${({ orientation, space }) =>
      orientation === "vertical"
        ? `
            margin-left: ${space};
            margin-right: ${space};
          `
        : `
          margin-top: ${space};
          margin-bottom: ${space};
        `}
  }
`;
