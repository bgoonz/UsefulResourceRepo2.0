import { useEffect } from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../Component/Navbar";

import { getMoviesById } from "../../Data/MovieData";

const Movie = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { movie } = props;

  return (
    <div>
      <Head>
        <title>Home</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossorigin="anonymous"
        />
        <script
          src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
          integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
          integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
          integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
          crossorigin="anonymous"
        ></script>
      </Head>

      <Navbar />
      <div className="mt-5">
        <div className="mt-5 container">
          movie id:{id}
          <div className="jumbotron jumbotron-fluid mt-5">
            <div className="container">
              <h1 className="display-4">{movie.name}</h1>
              <p className="lead">
                This is a modified jumbotron that occupies the entire horizontal
                space of its parent.
              </p>
              <p>descrition</p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Movie.getInitialProps = async ({ query }) => {
  const movie = await getMoviesById(query.id);
  return { movie };
};

export default Movie;
