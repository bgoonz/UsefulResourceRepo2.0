import withApollo from "../../hoc/withApollo";
import withAuth from "../../hoc/withAuth";
import PortfolioForm from "../../components/forms/PortfolioForm";
import { useCreatePortfolio } from "../../apolloLogic/actions";
import { useRouter } from "next/router";
import BaseLayout from "@/layouts/BaseLayout";

const PortfolioCreate = () => {
  const [createPortfolio, { error }] = useCreatePortfolio();
  const router = useRouter();

  const errorMessage = (error) => {
    return error.graphQLErrors[0]?.message || "Ooops, something went wrong";
  };

  const handleCreatePortfolio = async (data) => {
    await createPortfolio({ variables: data });
    router.push("/portfolios");
  };
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Create New Portfolio</h1>
            <PortfolioForm onSubmit={handleCreatePortfolio} />
            {error && (
              <div className="alert alert-danger">{errorMessage(error)} </div>
            )}
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default withApollo(
  withAuth(PortfolioCreate, ["guest", "admin", "instructor"])
);
