import { useState } from "react";
import { Stack, Tab, Tabs } from "@mui/material";
import Layout from "components/layout";
import MyAccount from "components/account/myAccount";
import Preferences from "components/account/preferences";
import FileMangement from "components/account/fileManagement";
import { SpacingVertical } from "components/ui-components/spacer";

export default function Account() {
  const [tab, setTab] = useState(0);

  return (
    <Layout pageTitle="Account">
      <Stack
        width={"100%"}
        height={"20vh"}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="My Account" />
          <Tab label="Favourite" />
          <Tab label="File Management" />
        </Tabs>
      </Stack>
      <SpacingVertical space="24px" />
      <Stack width={"100%"} alignItems={"center"}>
        {tab === 0 && <MyAccount />}
        {tab === 1 && <Preferences />}
        {tab === 2 && <FileMangement />}
      </Stack>
    </Layout>
  );
}
