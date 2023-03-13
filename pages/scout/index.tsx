import dynamic from "next/dynamic";
import styled from "styled-components";
import Switch from "components/Switch";
import { useState } from "react";
import Script from "next/script";

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
