export default function Photo(props) {
  return <>{props.photo.title}</>;
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await res.json();
  const photos = data.splice(0, 50);

  const paths = photos.map((photo) => {
    return {
      params: {
        photo: `${photo.id}`,
      },
    };
  });

  console.log(paths);

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos/${params.photo}`
  );
  const data = await res.json();

  return {
    props: {
      photo: data,
    },
  };
}
