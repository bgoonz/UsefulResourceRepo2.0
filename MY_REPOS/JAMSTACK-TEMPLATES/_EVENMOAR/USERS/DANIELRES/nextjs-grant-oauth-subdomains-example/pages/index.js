import Head from "next/head";
import { Protected } from "../components/Protected";
import { getServerSideProfile } from "./utils/getServerSideProfile";

export const getServerSideProps = async (context) => {
  const profile = await getServerSideProfile(context);
  return { props: { profile } };
};

export default function Home({ profile }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Protected profile={profile}>
        <h2>
          Profile <small>(protected)</small>
        </h2>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </Protected>
    </div>
  );
}
