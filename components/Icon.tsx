import styled from "styled-components";

export type IconNames =
  | "logo"
  | "show-eye"
  | "hide-eye"
  | "smart-bridge-ai"
  | "search"
  | "fuel-cell"
  | "fuel-oil"
  | "electric-vehicle";

interface Props {
  width?: number;
  height?: number;
  src: IconNames;
  onClick?: () => void;
  m?: any;
  p?: any;
  hover?: boolean;
}

export const Icon = ({
  width = 30,
  height = 30,
  src,
  onClick,
  m = "",
  p = "",
  hover = false,
}: Props) => {
  return (
    <StyledIcon
      src={`/icons/${src}.svg`}
      width={width}
      height={height}
      onClick={onClick}
      m={m}
      p={p}
      hover={hover}
    />
  );
};

const StyledIcon = styled.img<{
  m: any;
  p: any;
  width: number;
  height: number;
  hover: boolean;
}>`
  cursor: ${(props) => (props.hover ? "pointer" : "default")};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  margin: ${(props) => props.m};
  padding: ${(props) => props.p};
  object-fit: contain;
`;
