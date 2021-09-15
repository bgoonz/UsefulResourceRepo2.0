import axios from "axios";
import Cookie from "js-cookie";
import { AUTH_SUCCESS, AUTH_FAIL } from "./types";

const namespace = "https://portfel.com/";

const axiosService = axios.create({
  baseURL: "/api/v1",
  timeout: 2000,
});

const setAuthHeader = () => {
  const token = Cookie.getJSON("jwt");

  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  return null;
};

const extractUrl = (req) => {
  return req ? `${req.protocol}://${req.get("Host")}/api/v1` : "";
};

//---------------------- AUTH ----------------------------

export const authSuccess = (user) => {
  return {
    type: AUTH_SUCCESS,
    user,
  };
};

export const authFail = () => {
  return {
    type: AUTH_FAIL,
  };
};

//---------------------- CV ----------------------------

export const getCv = (req) => {
  const url = req ? `${req.protocol}://${req.get("Host")}` : "";

  return axios.get(`${url}/jerga_cv.pdf`).then((response) => response.data);
};

//---------------------- PORTFOLIOS ----------------------------

export const createPortfolio = (portfolio) => {
  return axiosService.post("/portfolios", portfolio, setAuthHeader());
};

export const getPortfolios = (req) => {
  return axiosService
    .get(`${extractUrl(req)}/portfolios`)
    .then((response) => response.data)
    .catch(({ response }) => response.data);
};

//---------------------- BLOGS ----------------------------

export const getAllBlogs = (req) => {
  return axiosService
    .get(`${extractUrl(req)}/blogs`)
    .then((response) => response.data);
};

export const getBlogBySlug = (req, slug) => {
  return axiosService
    .get(`${extractUrl(req)}/blogs/${slug}`, setAuthHeader())
    .then((response) => response.data);
};

// export const getAllBlogsServer = (url) => {
//   return axiosService.get(`${url}/api/v1/blogs`).then(response => response.data);
// }

export const getBlogById = (userId) => {
  return axiosService
    .get(`/blogs/me/${userId}`, setAuthHeader())
    .then((response) => response.data);
};

// export const getBlogBySlugServer = (req) => {
//   return axiosService.get(`${url}/api/v1/blogs/${slug}`, setAuthHeader()).then(response => response.data);
// }

export const getMyBlogs = () => {
  return axiosService
    .get(`/blogs/me`, setAuthHeader())
    .then((response) => response.data);
};

export const saveBlog = (blog) => {
  if (blog._id) {
    return axiosService.patch(`/blogs/${blog._id}`, blog, setAuthHeader());
  }

  return axiosService
    .post("/blogs/new", blog, setAuthHeader())
    .then((res) => res.data.blog);
};

export const updateBlog = (blog) => {
  return axiosService.patch(`/blogs/${blog._id}`, blog, setAuthHeader());
};

export const deleteBlog = (blogId) => {
  return axiosService.delete(`/blogs/${blogId}`, setAuthHeader());
};
