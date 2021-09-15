import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const parseQueryString = query =>
  query
    ? (/^[?#]/.test(query) ? query.slice(1) : query)
        .split("&")
        .reduce((params, param) => {
          let [key, value] = param.split("=");
          params[key] = value
            ? decodeURIComponent(value.replace(/\+/g, " "))
            : "";
          return params;
        }, {})
    : {};

const addLocationQuery = history => {
  history.location = {
    ...history.location,
    query: parseQueryString(history.location.search)
  };
};

addLocationQuery(history);
history.listen(() => addLocationQuery(history));

export default history;
