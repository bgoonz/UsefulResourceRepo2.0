import { Container, Jumbotron } from "reactstrap";
import axios from "axios";

function CarPage({
  car: { name, model, description, pdate, sdate, pprice, sprice, profit },
}) {
  return (
    <>
      <Container>
        <Jumbotron>
          <h1 className="display-4">{name}</h1>
          <h2 className="display-4">{model}</h2>
          <p className="lead">{description}</p>
          <hr className="my-4" />
          <h3>{pdate}</h3>
          <h3>{sdate}</h3>
          <h3>{pprice}</h3>
          <h3>{sprice}</h3>
          <h3>{profit}</h3>
        </Jumbotron>
      </Container>
    </>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const url = `http://localhost:3000/api/cars`;
  const response = await axios.get(`${url}/${id}`);
  return {
    props: {
      car: response.data,
    },
  };
}

export default CarPage;
