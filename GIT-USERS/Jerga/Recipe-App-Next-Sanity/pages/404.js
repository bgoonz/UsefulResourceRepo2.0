import Head from "next/head";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Page not found</title>
      </Head>
      <div className="section">
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link href="/">
          <a>Go back to home.</a>
        </Link>
      </div>
    </>
  );
}
