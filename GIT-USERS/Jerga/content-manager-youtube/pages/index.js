import Layout from "components/Layout";
import ResourceHighlight from "components/ResourceHighlight";
import Newsletter from "components/Newsletter";
import ResourceList from "components/ResourceList";
import Footer from "components/Footer";
import API from "api_server/ResourceAPI";

function Home({ resources }) {
  return (
    <Layout>
      <ResourceHighlight resources={resources.slice(0, 2)} />
      <Newsletter />
      <ResourceList resources={resources.slice(2)} />
      <Footer />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await API.fetchResources();
  const data = await res.json();

  return {
    props: {
      resources: data,
    },
  };
}

export default Home;
