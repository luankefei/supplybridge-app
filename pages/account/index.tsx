import MyAccount from "components/account/myAccount";
import Preferences from "components/account/preferences";
import FileMangement from "components/account/fileManagement";
import Layout from "components/layout";

export default function Account() {
  return (
    <Layout pageTitle="Account">
      <MyAccount />
      <Preferences />
      <FileMangement />
    </Layout>
  );
}
