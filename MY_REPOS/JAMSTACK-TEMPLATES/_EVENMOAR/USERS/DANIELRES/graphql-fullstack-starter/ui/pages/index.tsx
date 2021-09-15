import React from "react";
import Layout from "../components/ui/Layout";
import Spinner from "../components/ui/Spinner";
import { useHelloQuery } from "../generated/react-apollo";

export default function PageIndex(): JSX.Element {
  const { data, loading } = useHelloQuery();

  if (loading || !data) return <Spinner center />;

  return (
    <Layout>
      <main>{data.hello}</main>
    </Layout>
  );
}
