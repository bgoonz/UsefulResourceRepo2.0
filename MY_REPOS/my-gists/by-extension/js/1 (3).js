function Article({ id }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    let cancelToken = new CAF.cancelToken();

    let fetchData = CAF(function *fetchData(signal) {
      const article = yield API.fetchArticle(id);
      setArticle(article);
    });

    fetchData(cancelToken);

    return () => {
      cancelToken.abort();
    };
  }, [id]);

  // ...
}