import axios from "axios";
import Cookies from "js-cookie";

const setAuthHeader = () => {
  const token = Cookies.getJSON("jwt");

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } };
  }

  return undefined;
};

export const getSecretData = async () => {
  console.log("hello");
  return await axios.get("/api/v1/secret", setAuthHeader()).then((response) => {
    console.log(response);
    return response.data;
  });
};
