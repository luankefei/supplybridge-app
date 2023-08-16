import { Star } from "@mui/icons-material";
import { Button, Card, Stack } from "@mui/material";
import { TitleText } from "components/ui-components/text";
import { useTranslation } from "react-i18next";
import { MyUIDivider } from "../common";

export default function Favourite() {
  const { t } = useTranslation("myAccount");
  return (
    <Card component={Stack} p={3} elevation={0}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TitleText>{t("favouriteSupplier", "Favourite")}</TitleText>
        <Button variant={"outlined"}>{t("edit", "Edit")}</Button>
      </Stack>
      <MyUIDivider />
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Star
          sx={{
            fontSize: 50,
            color: "#E5E7EB", //"#FFC107",
          }}
        />
      </Stack>
    </Card>
  );
}
