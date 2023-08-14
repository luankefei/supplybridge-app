import { useState } from "react";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Input,
  InputBase,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import { SText, STextBody16, TitleText } from "components/ui-components/text";
import { useTranslation } from "react-i18next";
import { usePersistentStore, useStore } from "hooks/useStore";
import router from "next/router";
import LanguageSelector from "components/languageSelector";
import Image from "next/image";
import { toast } from "react-toastify";
import { request } from "config/axios";
import { Check, Clear, Replay } from "@mui/icons-material";

export default function MyAccount() {
  const { t } = useTranslation("myAccount");
  const { resetAll } = useStore();
  const { user, signOut } = usePersistentStore();
  const [name, setName] = useState(user?.name || "");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateAccount = async (name: string) => {
    try {
      setError(false);
      setLoading(true);
      const res = await request.put(`/users/${user!.id}`, {
        name,
      });
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      setTimeout(() => {
        setShowConfirm(false);
      }, 1000);
    } catch (error) {
      toast.error(`Error: ${error}`);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOut();
    resetAll();
    router.push("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <Stack
      width={"500px"}
      height={"400px"}
      bgcolor={"white"}
      borderRadius={2}
      m={1}
      p={4}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TitleText>{t("myAccount", "My Account")}</TitleText>
        <Button variant="outlined" onClick={logout}>
          {t("logout", "Log out")}
        </Button>
      </Stack>
      <SpacingVertical space="16px" />
      <Divider />
      <SpacingVertical space="16px" />
      <Grid container spacing={2} alignItems={"center"}>
        <Grid item xs={6}>
          <STextBody16>{t("email", "Email")}</STextBody16>
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" disabled value={user.email} />
        </Grid>
        <Grid item xs={6}>
          <STextBody16>{t("displayName", "Display Name")}</STextBody16>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <Paper
            component={"form"}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              value={name}
              error={error}
              endAdornment={
                showConfirm &&
                (loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <IconButton
                      type="button"
                      onClick={() => {
                        updateAccount(name);
                      }}
                    >
                      {error ? (
                        <Clear color="error" />
                      ) : (
                        <Check color="success" />
                      )}
                    </IconButton>
                    {name !== user.name && (
                      <IconButton
                        onClick={() => {
                          setName(user.name);
                          setShowConfirm(false);
                          setError(false);
                        }}
                      >
                        <Replay />
                      </IconButton>
                    )}
                  </>
                ))
              }
              onChange={(e) => {
                setName(e.target.value);
                setShowConfirm(true);
                setError(false);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
      <SpacingVertical space="16px" />
      <Divider />
      <SpacingVertical space="16px" />
      <Stack
        direction={"row"}
        p={"10px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <Image src={`/menu/globe.svg`} alt={""} width={20} height={20} />
          <SpacingHorizontal space="15px" />
          <SText
            fontSize="16px"
            fontWeight="300"
            lineHeight="22px"
            color="#1a1a1a"
          >
            {t("language", "Language")}
          </SText>
        </Stack>
        <LanguageSelector type="plain" />
      </Stack>
      <Stack
        direction={"row"}
        p={"10px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Button>{t("restPassowrd", "Reset Password")}</Button>
      </Stack>
    </Stack>
  );
}
