import { signIn, signOut, useSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { Heading } from "../components/ui/Heading";
import { UserList } from "../components/UserList";

const UserForm = dynamic(
  () =>
    import("../components/UserForm").then((module) => module.UserForm) as any,
  { ssr: false, loading: () => <div>"Loading..."</div> }
);

export default function Home() {
  const [session, loading] = useSession();

  if (loading) return <>Loading...</>;

  return (
    <div>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      <div className="flex flex-col text-center w-full">
        <Heading level={1}>Members</Heading>
      </div>

      <div className="w-1/2 mx-auto">
        <div className="mb-16">
          <Heading level={2}>Add member</Heading>
          <UserForm />
        </div>
      </div>

      <UserList />
    </div>
  );
}
