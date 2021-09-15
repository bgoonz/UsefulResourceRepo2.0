import React from "react";
import Layout from "../components/ui/Layout";
import Spinner from "../components/ui/Spinner";
import { useMeQuery } from "../generated/react-apollo";

export default function PageProfile(): JSX.Element {
  const { data, loading } = useMeQuery();

  if (loading || !data?.me) return <Spinner center />;

  const { me } = data;

  return (
    <Layout>
      <table>
        <tbody>
          <tr>
            <th className="w-1/3">Name</th>
            <td>{me.name}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{me.email}</td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
