import dynamic from "next/dynamic";
import QuickByIndex from "components/scout/ScoutByIndex";
import styled from "styled-components";
import Switch from "components/Switch";

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
  display: flex;
  justify-content: center;
  margin-left: 280px;
`;
