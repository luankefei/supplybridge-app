import styled, { css } from "styled-components";
import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

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

const InfoIcon = styled.span<any>`
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
  margin-top: ${(props) => `${props.top || 0}px`};
  margin-left: ${(props) => `${props.left || 0}px`};
`

export default function Tip (props: any) {
   const { text, top, left } = props;
   return (
      <HtmlTooltip
        placement="top"
        arrow
        title={text}
      >
        <InfoIcon top={top} left={left}>
          i
        </InfoIcon>
      </HtmlTooltip>
   );
}
