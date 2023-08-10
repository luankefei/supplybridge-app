import { Box } from "@mui/material";
import { SpacingVertical } from "components/ui-components/spacer";
import { SText } from "components/ui-components/text";
import React from "react";
import { useTranslation } from "react-i18next";

/**
 * My custom tooltip to be used in the raw material page
 */
export default function MaterialTooltip({
  content,
  automotiveUsage,
}: {
  content: string;
  automotiveUsage: string;
}) {
  const { t } = useTranslation("rawMaterial");
  return (
    <Box bgcolor={"#374151"} sx={{ padding: "12px", borderRadius: "12px" }}>
      <SText color="#FFF" fontSize="14px" fontWeight="400" lineHeight="1rem">
        {content}
      </SText>
      <SpacingVertical space="16px" />
      <SText color="#9CA3AF" fontSize="12px" fontWeight="400" lineHeight="1rem">
        {t("automotiveUse")}: <br />
        {automotiveUsage}
      </SText>
    </Box>
  );
}
