import { Button } from "@mui/material";
import { SpacingVertical } from "./spacer";
import Icon from "components/Icon";

/**
 * vertical icon button
 *
 * - title: button title, text to be shown
 * - backgroundColor: button background color
 * - icon: icon image path, only accept icons by our design, i.e in our assets folder
 * - iconColor: icon color
 * - onClick: button click handler
 */
const VerticalIconButton = ({
  title,
  backgroundColor,
  icon,
  iconColor,
  disabled,
  onClick,
}: {
  title: string;
  backgroundColor?: string;
  icon: string;
  iconColor?: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      style={{
        minWidth: "156px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        backgroundColor: backgroundColor,
      }}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon hover width={52} height={52} src={icon} color={iconColor} />
      <SpacingVertical space="10px" />
      {title}
    </Button>
  );
};

export default VerticalIconButton;
