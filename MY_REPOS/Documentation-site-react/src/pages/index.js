import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: "Bryan Guner Web Dev Docs",
    imageUrl:
      "https://avatars.githubusercontent.com/u/66654881?s=460&u=4614c45125eb6ab7e4b04468cb9cdf5c998c879d&v=4",
    description: (
      <>
        🔭 Contract Web Development Relational Concepts 🌱 I'm currently
        learning React/Redux, Python, Java, Express, jQuery 👯 I'm looking to
        collaborate on Any web audio or open source educational tools. 🤝 I'm
        looking for help with Learning React 👨‍💻 All of my projects are available
        at https://bgoonz.github.io/ 📝 I regularly write articles on
        https://goofy-euclid-1cd736.netlify.app/core-site/index.html 💬 Ask me
        about Anything: 📫 How to reach me bryan.guner@gmail.com ⚡ Fun fact I
        played Bamboozle Music Festival at the Meadowlands Stadium Complex when
        I was 14.
      </>
    )
  },
  {
    title: "My Other Websites",
    imageUrl:
      "https://github.com/bgoonz/web-dev-resource-hub/blob/master/core-site/images/logo-transparent.png?raw=true",
    description: <>
      
   
      
      
      
      
      
      
      
    </>
  },
  {
    title: "Learning React",
    imageUrl:
      "https://github.com/bgoonz/web-dev-resource-hub/blob/master/core-site/images/logo-transparent.png?raw=true",
    description: (
      <>
     
In HTML, almost all tags have both an opening and closing tag the closing tag always has a forward slash before the tag name that you are closing.
there are special instances in HTML called "self-closing tags", or tags that don't require both an opening and closing tag before another tag can start.
      </>
    )
  }
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              To Docs
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
