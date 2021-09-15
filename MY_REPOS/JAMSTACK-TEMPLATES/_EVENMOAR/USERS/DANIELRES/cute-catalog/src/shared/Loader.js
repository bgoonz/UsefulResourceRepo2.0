const Loader = ({ children, isLoading }) =>
  isLoading ? "Loading..." : children;

export default Loader;
