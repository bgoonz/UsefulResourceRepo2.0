import Link from "next/link";
import { useGetData } from "actions";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function portfolios({ user }) {
  const router = useRouter();

  useEffect(() => {
    if (user["https://developer.com/roles"][0] != "admin") {
      router.push("/");
    }
  }, []);

  const { data: posts, error, loading } = useGetData("/api/v1/posts");

  const renderPosts = (posts) => {
    return posts.map((post) => (
      <li key={post.id}>
        <Link href={`/portfolios/${post.id}`}>{post.title}</Link>
      </li>
    ));
  };

  return (
    <>
      <ul>
        {user && user.name}
        {loading && <h1>Loading</h1>}
        {posts && renderPosts(posts)}
        {error && <h1>{error.message}</h1>}
      </ul>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
