import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetUser } from "@/actions/user";
import { formatDate } from "helpers/functions";
import PortfolioApi from "@/lib/api/portfolios";
import { useRouter } from "next/router";

const Portfolio = ({ portfolio }) => {
  const router = useRouter();
  const { data: dataU, loading: loadingU } = useGetUser();

  if (router.isFallback) {
    return "Loading...";
  }

  return (
    <BaseLayout navClass="transparent" user={dataU} loading={loadingU}>
      <BasePage
        noWrapper
        indexPage
        title={`${portfolio.title} - Filip Jerga`}
        metaDescription={portfolio.description}
      >
        <div className="portfolio-detail">
          <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" class="inner page-cover">
              <h1 class="cover-heading">{portfolio.title}</h1>
              <p class="lead dates">
                {formatDate(portfolio.startDate)} -{" "}
                {formatDate(portfolio.endDate) || "Present"}
              </p>
              <p class="lead info mb-0">
                {portfolio.jobTitle} | {portfolio.company} |{" "}
                {portfolio.location}
              </p>
              <p class="lead">{portfolio.description}</p>
              <p class="lead">
                <a
                  href={portfolio.companyWebsite}
                  target="_"
                  class="btn btn-lg btn-secondary"
                >
                  Visit Company
                </a>
              </p>
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export async function getStaticPaths() {
  console.log("reexecuting getStaticPaths");
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  const paths = portfolios.map((portfolio) => {
    return {
      params: { id: portfolio._id },
    };
  });

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log("reexecuting getStaticProps");
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: { portfolio }, unstable_revalidate: 60 };
}

export default Portfolio;
