import { Button } from "@mui/material";
import Icon from "components/icon";
import { useTranslation } from "react-i18next";

interface IIconTextButtonProps {
  icon: string;
  text: string;
  onClick: () => void;
}
/**
 * IconTextButton
 * - uses Button from MUI
 * -- icon from our own
 */
export const IconTextButton = ({
  icon,
  text,
  onClick,
}: IIconTextButtonProps) => {
  return (
    <Button variant="text" onClick={onClick}>
      <Icon src={icon} width={12} height={12} m="0px 6px" />
      {text}
    </Button>
  );
};

export const ResetIconTextButton = ({ onClick }: { onClick: () => void }) => {
  const { t } = useTranslation();
  return (
    <IconTextButton
      icon="reset"
      text={t("scout.searchbar.reset", "Reset")}
      onClick={onClick}
    />
  );
};

export default IconTextButton;
