import { fetch } from "whatwg-fetch";

class ApiResponseError extends Error {
  constructor(response, message) {
    super();
    this.code = response.status;
    this.message = message;
  }
}

const fetchResource = async (url) => {
  const response = await fetch(url, {
    method: "get",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (response.ok) return json;
  throw new ApiResponseError(response, json.error);
};

const postResource = async (url, body) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (response.ok) return json;
  throw new ApiResponseError(response, json.error);
};

export const putResource = async (url, body) => {
  const response = await fetch(url, {
    method: "put",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  if (response.ok) return json;
  throw new ApiResponseError(response, json.error);
};

export const onLogin = () =>
  postResource("/api/login", { username: "John", password: "pw" });

export const onLogout = () => postResource("/api/logout");

export const fetchCurrentUser = () => fetchResource("/api/users/current");

export const fetchProducts = () => fetchResource("/api/products");

export const fetchProduct = (id) => fetchResource(`/api/products/${id}`);

export const admin = {
  fetchImageUploadEndpointAndSignature: ({ filename }) =>
    fetchResource(`/api/admin/images/uploads/endpoint?filename=${filename}`),

  createProduct: (body) => postResource("/api/admin/products", body),
  updateProduct: (id, body) => putResource(`/api/admin/products/${id}`, body),
};

export const postLoginEmailPasswordForm = (values) =>
  postResource("/api/login", values);

export const postRegisterForm = (values) =>
  postResource("/api/login/register", values);

export const postRegisterConfirmationtoken = (token) =>
  postResource(`/api/login/register/confirm`, { token });
