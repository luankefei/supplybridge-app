import styled from "styled-components";

export type IconNames =
  | "logo"
  | "show-eye"
  | "hide-eye"
  | "automotive"
  | "automotive-bordered"
  | "aerospace"
  | "railway"
  | "other"
  | "chevron_down"
  | "smart-bridge-ai"
  | "search"
  | "fuel-cell"
  | "fuel-oil"
  | "electric-vehicle"
  | "verified"
  | "innovation";

interface Props {
  width?: number;
  height?: number;
  color?: string;
  src: IconNames | string;
  onClick?: () => void;
  m?: any;
  p?: any;
  hover?: boolean;
  tooltip?: string;
}

const Icon = ({
  width = 30,
  height = 30,
  color = undefined,
  src,
  onClick,
  m = "",
  p = "",
  hover = false,
  tooltip = "",
}: Props) => {
  return (
    <StyledIcon
      src={`/icons/${src}.svg`}
      width={width}
      height={height}
      color={color}
      onClick={onClick}
      m={m}
      p={p}
      hover={hover}
      title={tooltip}
    />
  );
};

const StyledIcon = styled.img<{
  m: any;
  p: any;
  width: number;
  height: number;
  color: string | undefined;
  hover: boolean;
}>`
  cursor: ${(props) => (props.hover ? "pointer" : "default")};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  margin: ${(props) => props.m};
  padding: ${(props) => props.p};
  color: ${(props) => props.color?.toString()};
  object-fit: contain;
`;

export default Icon;
