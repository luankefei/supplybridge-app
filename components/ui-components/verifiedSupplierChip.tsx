import { Stack, useTheme } from "@mui/material";
import Icon from "components/icon";
import { useTranslation } from "react-i18next";
import { SText } from "./text";
import { SpacingHorizontal } from "./spacer";

const VerifiedSupplierChip = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        paddingLeft: "8px",
        paddingRight: "8px",
        borderRadius: "24px",
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Icon src="verified-green" width={24} />
      <SpacingHorizontal space="8px" />
      <SText color={theme.palette.secondary.contrastText}>
        {t("common.verifiedSupplier", "Verified Supplier")}
      </SText>
    </Stack>
  );
};

export default VerifiedSupplierChip;
