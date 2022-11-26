import Head from 'next/head';
import Link from 'next/link';

import { Layout } from "components";

export default function Industry() {
  return (
    <Layout>
      <>
        <Head>
          <title>Choose an Industry | Supply Bridge</title>
          <meta name="description" content="Supply Bridge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Industry Selection</h1>
          <Link href={`dashboard/automotive`} passHref>Automotive</Link>
        </main>
      </>
    </Layout>
  );
}
