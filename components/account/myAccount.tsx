import { useEffect, useState } from "react";
import { Button, Divider, Grid, Stack, TextField } from "@mui/material";
import {
  SpacingHorizontal,
  SpacingVertical,
} from "components/ui-components/spacer";
import {
  SText,
  STextSecondary,
  TitleText,
} from "components/ui-components/text";
import { useTranslation } from "react-i18next";
import { usePersistentStore, useStore } from "hooks/useStore";
import router from "next/router";
import LanguageSelector from "components/languageSelector";
import { toast } from "react-toastify";
import { request } from "config/axios";

export default function MyAccount() {
  const { t } = useTranslation("myAccount");
  const { resetAll } = useStore();
  const { user, setUser, signOut } = usePersistentStore();
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(user?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  /*******************
   * API CALLS
   * *************
   */
  const fetchUser = async () => {
    try {
      const res = await request.get(`/users/${user!.id}`);
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      setName(res.data.data.name);
      setUser(res.data.data);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  const updateAccount = async (name: string) => {
    try {
      const res = await request.put(`/users/${user!.id}`, {
        name,
      });
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      toast.success(t("updateSuccess", "Update success"));
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      fetchUser();
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const res = await request.put(`/users/${user!.id}`, {
        /**
         * CANNOT use SHA256 here because the server will
         * not recognize the password.
         * TODO: Fix all password hashing in the database
         */
        oldPassword, //: SHA256(oldPassword).toString(),
        newPassword, //: SHA256(newPassword).toString(),
      });
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      toast.success(t("updateSuccess", "Update success"));
      setNewPassword("");
      setNewPassword2("");
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setOldPassword("");
    }
  };

  /** END OF Api calls */

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    signOut();
    resetAll();
    router.push("/login");
  };
  const sameName = name === user?.name;
  const onSaveAccout = async () => {
    if (sameName) {
      return;
    }
    setLoading(true);
    await updateAccount(name);
    setLoading(false);
  };
  const passwordBtnDisabled =
    newPassword !== newPassword2 || !oldPassword || !newPassword;
  const onUpdatePassword = async () => {
    if (passwordBtnDisabled) {
      return;
    }
    setLoading(true);
    await updatePassword(oldPassword, newPassword);
    setLoading(false);
  };

  if (!user) {
    return null;
  }

  const MyUIDivider = () => (
    <>
      <SpacingVertical space="16px" />
      <Divider />
      <SpacingVertical space="16px" />
    </>
  );

  return (
    <Stack bgcolor={"white"} borderRadius={2} m={1} p={4} maxWidth={"50%"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TitleText>{t("myAccount", "My Account")}</TitleText>
        <Stack direction={"row"} alignItems={"center"}>
          <SText fontWeight="400">{user.email}</SText>
          <SpacingHorizontal space="16px" />
          <Button variant="outlined" color="error" onClick={logout}>
            {t("logout", "Log out")}
          </Button>
        </Stack>
      </Stack>
      <MyUIDivider />
      <Grid container spacing={2} alignItems={"flex-start"}>
        <Grid item xs={6}>
          <STextSecondary>{t("displayName", "Display Name")}</STextSecondary>
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
          <TextField
            fullWidth
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button
            disabled={loading || sameName}
            variant="outlined"
            onClick={onSaveAccout}
          >
            {t("save", "Save")}
          </Button>
        </Grid>
      </Grid>
      <MyUIDivider />
      <Grid container spacing={2} alignItems={"flex-start"}>
        <Grid item xs={6}>
          <STextSecondary>
            {t("resetPassword", "Reset password")}
          </STextSecondary>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            disabled={loading}
            label={t("oldPassword", "Old password")}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <TextField
            fullWidth
            disabled={loading}
            label={t("newPassword", "New password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <TextField
            fullWidth
            disabled={loading}
            error={newPassword !== newPassword2}
            helperText={
              newPassword !== newPassword2 &&
              t("passwordNotMatch", "Password not match")
            }
            label={t("confirmPassword", "Confirm password")}
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button
            disabled={loading || passwordBtnDisabled}
            variant="outlined"
            onClick={onUpdatePassword}
          >
            {t("update", "Update")}
          </Button>
        </Grid>
      </Grid>

      <MyUIDivider />
      <Grid container spacing={2} alignItems={"flex-start"}>
        <Grid item xs={6}>
          <STextSecondary>{t("language", "Language")}</STextSecondary>
        </Grid>
        <Grid item xs={6}>
          <LanguageSelector variant="dropdown" />
        </Grid>
      </Grid>
    </Stack>
  );
}
