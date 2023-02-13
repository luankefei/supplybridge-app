import styled, { css } from "styled-components";
import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import _ from "lodash";

interface ContainerProps {
  selected: boolean;
  disabled?: boolean
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#374151',
    borderRadius: "8px",
    padding: "8px 10px",
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: "15px",
    color: "#E6E6E6",
  },
}));

export default function BigCard({ src, title, selected, width = 82, height = 82, infoContent = null, disabled = false }: any) {
  // const [selected, setSelected] = useState(false)
  // useEffect(() => {
  // }, [selected])

  return (
    <>
      <CardContainer selected={selected} disabled={disabled}>
        <IconBackground>
          {
            _.startsWith(src, "http") ?
              <Icon width={width} height={height} src={src} /> :
              <Icon width={width} height={height} src={`/icons/${src}.svg`} />
          }
        </IconBackground>

        <Title disabled={disabled}>{title}</Title>
        {infoContent &&
          <HtmlTooltip
            placement="top"
            arrow
            title={infoContent}
          >
            <InfoIcon>
              i
            </InfoIcon>
          </HtmlTooltip>
        }
      </CardContainer>
    </>
  );
}

const CardContainer = styled.div<ContainerProps>`
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
  //background-color: ${(props) => props.disabled ? "#F3F4F6" : "#FFFFFF"};
  background-color: #FFFFFF;
  pointer-events: ${(props) => props.disabled && "none"};

  ${(props) =>
    props.disabled
      ? css`
        border: none;
      `
      : css<ContainerProps>`
          border: ${(props) => props.selected && "4px solid #08979C"};
        `};
  &:hover {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:active {
    border: 4px solid #445B66;
    box-shadow: none;
  }
`;

const IconBackground = styled.span`
  border-radius: 100%;
  background-color: #e6f5f5;
  width: 82px;
  height: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img``;

const Title = styled.span<{ disabled: boolean }>`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: ${(props) => props.disabled ? '#808080' : '#111827'};  
  margin-top: 22px;
`;

const InfoIcon = styled.span`
  width: 22px;
  height: 22px;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  color: #FFFFFF;
  background: #E6E6E6;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 14px;
  right: 14px;
`