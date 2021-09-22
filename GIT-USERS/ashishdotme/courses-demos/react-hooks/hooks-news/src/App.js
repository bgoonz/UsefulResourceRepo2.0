import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    setLoading(true);

    try {
      const results = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(results.data.hits);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getNews();
  };

  const clearSearch = () => {
    setQuery("");
    searchRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded">
      <h1 className="text-grey-900 font-thin text-4xl">Hooks News</h1>

      <form onSubmit={handleSubmit} className="mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchRef}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-orange-500 rounded m-1 p-2">
          Submit
        </button>
        <button
          type="button"
          onClick={clearSearch}
          className="bg-teal-500 text-white p-2 rounded"
        >
          Clear
        </button>
      </form>

      {loading ? (
        <h4 className="font-bold text-orange-800">Loading results...</h4>
      ) : (
        <ul>
          {results.map((result, i) => (
            <li className="list-reset leading-normal" key={i}>
              <a
                href={result.url}
                className="text-indigo-600 hover:text-indigo-900"
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red font-bold">{error}</p>}
    </div>
  );
}

export default App;
