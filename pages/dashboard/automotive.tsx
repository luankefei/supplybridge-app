import Head from "next/head";

import { Layout } from "components";

export default function Automotive() {
  return (
    <Layout>
      <>
        <Head>
          <title>Automotive | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Automotive</h1>
        </main>
      </>
    </Layout>
  );
}
