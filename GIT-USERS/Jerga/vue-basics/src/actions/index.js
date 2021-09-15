import axios from "axios";

export function fetchUser() {
  return new Promise((res) => {
    setTimeout(() => res({ name: "Filip" }), 2000);
  });
}

export function fetchResources() {
  return axios.get("/api/resources").then((res) => res.data);
}

export function searchResources(title) {
  return axios.get(`/api/resources/s/${title}`).then((res) => res.data);
}

export function fetchResourceByIdApi(resourceId) {
  return axios.get(`/api/resources/${resourceId}`).then((res) => res.data);
}

export function createResourceApi(resource) {
  return axios
    .post("/api/resources", resource)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data));
}

export function updateResourceApi(id, resource) {
  return axios
    .patch(`/api/resources/${id}`, resource)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data));
}

export function deleteResourceApi(id) {
  return axios
    .delete(`/api/resources/${id}`)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error?.response?.data));
}
