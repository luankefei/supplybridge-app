import styled from 'styled-components';

interface Props {
  width?: number;
  height?: number;
  src: string;
  onClick?: () => void;
  m?: any;
  p?: any;
  hover?: boolean;
}

export const Icon = ({ width = 30, height = 30, src, onClick, m = '', p = '', hover = false }: Props) => {
  return (
    <StyledIcon src={`/icon/${src}.svg`} width={width} height={height} onClick={onClick} m={m} p={p} hover={hover} />
  );
};

const StyledIcon = styled.img<{ m: any; p: any; width: number; height: number; hover: boolean }>`
  cursor: ${(props) => (props.hover ? 'pointer' : 'default')};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  margin: ${(props) => props.m};
  padding: ${(props) => props.p};
`;
