import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React from "react";
import FormSignin from "../components/forms/FormSignin";
import Layout from "../components/ui/Layout";
import Spinner from "../components/ui/Spinner";
import config from "../config";
import { useMeQuery } from "../generated/react-apollo";
import Providers from "../Providers";
import "./global.css";

const { PUBLIC } = config.routes;

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Providers>
      <AuthGate>
        <Component {...pageProps} />
      </AuthGate>
    </Providers>
  );
}

function AuthGate({ children }: { children: JSX.Element }) {
  const { loading, error } = useMeQuery();
  const router = useRouter();

  if (PUBLIC.includes(router.pathname)) return children;

  if (error)
    return (
      <Layout variant="card">
        <FormSignin />
      </Layout>
    );

  if (loading) return <Spinner center />;

  return children;
}
