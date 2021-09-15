import BaseLayout from "../../../components/layouts/BaseLayout";
import moment from "moment";
import { useRouter } from "next/router";
import BasePage from "../../../components/BasePage";
import { useGetUser } from "../../../actions/user";
import PortfolioApi from "../../../lib/api/portfolios";

const portfolio = ({ portfolio }) => {
  const router = useRouter();
  const { data, loading } = useGetUser();

  if (router.isFallback) {
    return <h1>Loading</h1>;
  }

  return (
    <BaseLayout navClass="transparent" user={data} loading={loading}>
      <BasePage
        noWrapper
        indexPage
        metaDescription={portfolio.description}
        title={`${portfolio.title} - Deep Shah`}
      >
        <div className="portfolio-detail">
          <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" className="inner page-cover">
              {/* {router.isFallback && (
                <h1 className="cover-heading">Your page is getting served..</h1>
              )} */}
              {/* {!router.isFallback && ( */}
              <>
                <h1 className="cover-heading">{portfolio.title}</h1>
                <p className="lead dates">
                  {moment(portfolio.startDate).format("LL")} -
                  {portfolio.endDate
                    ? moment(portfolio.endDate).format("LL")
                    : "Present"}
                </p>
                <p className="lead info mb-0">
                  {portfolio.jobTitle} | {portfolio.company} |
                  {portfolio.location}
                </p>
                <p className="lead">{portfolio.description}</p>
                <p className="lead">
                  <a
                    href={`https://${portfolio.companyWebsite}`}
                    target="_blank"
                    className="btn btn-lg btn-secondary"
                  >
                    Visit Company
                  </a>
                </p>
              </>
              {/* )} */}
            </main>
          </div>
        </div>
      </BasePage>
    </BaseLayout>
  );
};

export default portfolio;

// export const getServerSideProps = async ({ query }) => {
//   const json = await new PortfolioApi().getById(query.id);
//   const portfolio = json.data;

//   return {
//     props: {
//       portfolio,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  const paths = portfolios.map((portfolio) => {
    return {
      params: { id: portfolio._id },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;

  return {
    props: {
      portfolio,
    },
    revalidate: 1,
  };
};
