// HOC
const withRedux = (initStore) => (Component) => {
  const WithRedux = (props) => {
    return <Component {...props} />;
  };

  WithRedux.getInitialProps = async (ctx) => {
    const componentProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    // Here is where store is created and passed to _app
    const store = initStore();

    return { pageProps: { ...componentProps }, store };
  };

  return WithRedux;
};

// Root _app
const MyApp = ({ Component, pageProps, store }) => {
  console.log(pageProps);
  return (
    <div>
      {/* We can access store here thanks to withRedux */}
      {store.a}
      <Component {...pageProps} />
    </div>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  // this will be calling your "pages" getInitialProps
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  // here are some props we want to pass to _app component
  const _appProps = { c: 1, d: 2 };

  return { ...pageProps, ..._appProps };
};

// simple function to simulate store
const configureStore = () => {
  const store = { a: 1, b: 2 };
  return store;
};

export default withRedux(configureStore)(MyApp);
