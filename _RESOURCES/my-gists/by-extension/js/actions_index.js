export const useApiHandler = (apiCall) => {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
  });

  const clearError = () => {
    setReqState({ ...reqState, error: null });
  };

  const handler = async (...data) => {
    setReqState({ error: null, data: null, loading: true });
    try {
      const json = await apiCall(...data);

      setReqState({ error: null, data: json.data, loading: false });
      return json.data;
    } catch (e) {
      // console.log(e.response);
      const msg =
        (e.response && e.response.data) || "Oops, something went wrong!!";
      setReqState({ error: msg, data: null, loading: false });
      return Promise.reject(msg);
    }
  };

  return [handler, { ...reqState, clearError }];
};
