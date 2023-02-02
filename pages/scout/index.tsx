import dynamic from "next/dynamic";
import QuickByIndex from "components/scout/ScoutByIndex";
import styled from "styled-components";
import Switch from "components/Switch";
import { theme } from "config/theme";

const Layout = dynamic(() => import("components/Layout"));

export default function Industry() {
  return (
    <Layout>
      <>
        <Container>
          <Switch />
        </Container>
      </>
    </Layout>
  );
}

const Container = styled.div`
  width: calc(100%);
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
