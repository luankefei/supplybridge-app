import { styled as muiStyled } from "@mui/material/styles";
import Icon from "../Icon";
import { SpacingHorizontal } from "./spacer";

const Label = muiStyled("div")(`
font-family: 'Ubuntu';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 1.5rem;

display: flex;
align-items: center;
color: #1A1A1A;
`);

const StyledText = muiStyled("span")(`
font-family: 'Ubuntu';
font-style: normal;
font-weight: 400;
font-size: 13px;
color: #89A8B3;
`);

export default function PoweredBy() {
  return (
    <Label>
      <Icon width={24} src={"smart-bridge-ai"} />
      <SpacingHorizontal space={"8px"} />
      <StyledText>Powered by SmartBridge Artificial Intelligence</StyledText>
    </Label>
  );
}
