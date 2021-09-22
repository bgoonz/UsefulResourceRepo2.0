import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://bgoonz-blog.netlify.app/">WEBDEVHUB</a>
        </h1>

        <p className={styles.description}>
          Explore my Blog{' '}
          <code className={styles.code}> 🤖🎸</code>
        </p>

        <div className={styles.grid}>
          <a href="https://bgoonz-blog.netlify.app/docs/" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information,  explinations and tutorials .</p>
          </a>

          <a href="https://lambda-static-server.netlify.app/directory.html" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Lambda Static Assets Server</p>
          </a>

          <a
            href="https://lambda-768c2.firebaseapp.com/?75195#/"
            className={styles.card}
          >
            <h3>Firebase Deploy Of React Redux Medium Clone&rarr;</h3>
            <p>Discover and deploy any react template to google's cloud</p>
          </a>

          <a
            href="https://bg-portfolio.netlify.app/"
            className={styles.card}
          >
            <h3>Gatsby Portfolio &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/bgoonz/web-module-project-deploying-web-apps"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lambda HTTP Vercel Project {' '}
        </a>
      </footer>
    </div>
  );
}
