import { useApolloClient } from "@apollo/react-hooks";
import Link from "next/link";
import React from "react";
import { useMeQuery, useSignoutMutation } from "../../generated/react-apollo";
import Card from "./Card";
import Spinner from "./Spinner";

interface IProps {
  children: JSX.Element;
  variant?: "card";
}

export default function Layout({ children, variant }: IProps): JSX.Element {
  if (variant === "card") return <LayoutCard>{children}</LayoutCard>;
  return <LayoutDefault>{children}</LayoutDefault>;
}

function LayoutCard({ children }: { children: JSX.Element }) {
  return (
    <div className="w-64 mx-auto mt-24">
      <Card>{children}</Card>
    </div>
  );
}

function LayoutDefault({ children }: { children: JSX.Element }) {
  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <nav className="bg-black text-white mb-8">
        <div className="container px-4 py-4 mx-auto">
          <NavContent />
        </div>
      </nav>

      <div className="container mx-auto flex-grow flex flex-col">
        <main className="px-4 py-4 flex-grow bg-white shadow-lg rounded">
          {children}
        </main>
        <footer className="px-4 py-4 text-gray-600">Footer</footer>
      </div>
    </div>
  );
}

function NavContent() {
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery();
  const [signout] = useSignoutMutation();

  if (loading || !data?.me) return <Spinner center />;

  const { me } = data;

  const onClickSignout = async () => {
    await signout();
    apolloClient.stop();
    document.location.reload();
  };

  return (
    <div className="flex justify-between text-sm">
      <ul>
        <li>
          <Link href="/">
            <a className="hover:underline">Home</a>
          </Link>
        </li>
      </ul>

      <ul className="flex">
        <li className="mr-4">
          <Link href="/profile">
            <a className="hover:underline">{me.email}</a>
          </Link>
        </li>

        <li>
          <button
            className="hover:underline text-gray-400"
            onClick={onClickSignout}
            type="submit"
          >
            Signout
          </button>
        </li>
      </ul>
    </div>
  );
}
