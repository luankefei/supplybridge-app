import { styled as muiStyled } from "@mui/material/styles";
import Icon from "../icon";
import { SpacingHorizontal } from "./spacer";
import { useTranslation } from "react-i18next";
import { SText } from "./text";

const Label = muiStyled("div")(`
font-family: 'Ubuntu';
font-style: normal;
font-weight: 400;
font-size: 13px;
line-height: 1.5rem;
width: fit-content;

display: flex;
align-items: center;
color: #1A1A1A;
`);
export default function PoweredBy({
  row,
  short,
  center,
}: {
  row?: boolean;
  short?: boolean;
  center?: boolean;
}) {
  const { t } = useTranslation();
  let text = t("scout.poweredBy", "Powered by");
  if (short) {
    text += " SmartBridge AI";
  } else {
    text += " SmartBridge Artificial Intelligence";
  }
  return (
    <Label style={{ margin: center ? "auto" : undefined }}>
      <Icon width={24} src={"smart-bridge-ai"} />
      <SpacingHorizontal space={"8px"} />
      <SText fontSize="13px" fontWeight="400" color="#89A8B3">
        {text}
      </SText>
    </Label>
  );
}
