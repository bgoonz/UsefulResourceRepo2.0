export default function Ssr(props) {
  return (
    <>
      {props.photos.map((photo) => (
        <div>{photo.title}</div>
      ))}
    </>
  );
}

const delay = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res();
    }, 3000);
  });
};

export async function getServerSideProps() {
  await delay();

  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await res.json();

  return {
    props: {
      photos: data.splice(0, 50),
    },
  };
}
