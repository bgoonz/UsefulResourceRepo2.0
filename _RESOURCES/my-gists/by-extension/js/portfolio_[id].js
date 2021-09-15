import BaseLayout from "@/components/layouts/BaseLayout";
import BasePage from "@/components/BasePage";
import { useGetProjetById } from "../../actions";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

const Projet = () => {
  const router = useRouter();
  const { data: projets, error, loading } = useGetProjetById(router.query.id);

  return (
    <BaseLayout>
      <BasePage>
        {loading && <Loader />}
        {projets && (
          <>
            <h1>{projets.title}</h1>
            <p>{projets.id}</p>
            <p>{projets.body}</p>
          </>
        )}
        {error && <div className="alert alert-danger">{error.message}</div>}
      </BasePage>
    </BaseLayout>
  );
};

export default Projet;
