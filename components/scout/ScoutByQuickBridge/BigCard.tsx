import styled from "styled-components";
import React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

interface ContainerProps {
  selected: boolean;
}

export default function BigCard({ src, title, selected, width = 50, height = 50, infoContent = null }: any) {
  // const [selected, setSelected] = useState(false)

  // useEffect(() => {

  // }, [selected])

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

  return (
    <>
      <CardContainer selected={selected}>
        <IconBackground>
          <Icon width={width} height={height} src={`/icons/${src}.svg`} />
        </IconBackground>

        <Title>{title}</Title>
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
  border: ${(props) => props.selected && "4px solid #08979C"};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
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

const Title = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #111827;
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