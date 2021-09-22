import axios from "axios";

const BASE_URL = process.env.BASE_URL;

const ACTIVITY_DATA = [];
const CATEGORY_DATA = [
  { id: "c-00", name: "All Activities" },
  { id: "c-12", name: "Accademic" },
  { id: "c-01", name: "Adventure Sports" },
  { id: "c-02", name: "Attractions" },
  { id: "c-03", name: "Art, Crafts and Cooking" },
  { id: "c-04", name: "Birthday Parties" },
  { id: "c-05", name: "Events" },
  { id: "c-06", name: "Holiday Camps" },
  { id: "c-07", name: "Parks and Skate Parks" },
  { id: "c-08", name: "Performing Arts" },
  { id: "c-09", name: "Play Centres" },
  { id: "c-10", name: "Sport and Games" },
  { id: "c-11", name: "Theme Parks and Water Parks" },
];

export const CATEGORY_LIST = [
  { value: "c-00", label: "All Activities" },
  { value: "c-12", label: "Accademic" },
  { value: "c-01", label: "Adventure Sports" },
  { value: "c-02", label: "Art, Crafts and Cooking" },
  { value: "c-03", label: "Attractions" },
  { value: "c-04", label: "Birthday Parties" },
  { value: "c-05", label: "Events" },
  { value: "c-06", label: "Holiday Camps" },
  { value: "c-07", label: "Parks and Skate Parks" },
  { value: "c-08", label: "Performing Arts" },
  { value: "c-09", label: "Play Centres" },
  { value: "c-10", label: "Sport and Games" },
  { value: "c-11", label: "Theme Parks and Water Parks" },
];

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CATEGORY_DATA);
      // reject('Cannot fetch category data')
    }, 20);
  });
};

export const getActivities = () => {
  console.log(BASE_URL);
  console.log(process.env.BASE_URL);
  return axios.get(`${BASE_URL}/api/v1/activities`).then((res) => res.data);
};

export const createActivity = (activity) => {
  activity.id = Math.random().toString(36).substr(2, 7);
  return axios
    .post(`${BASE_URL}/api/v1/activities`, activity)
    .then((res) => res.data);
};

export const getActivityById = (id) => {
  console.log(id);
  return axios
    .get(`${BASE_URL}/api/v1/activities/${id}`)
    .then((res) => res.data);
};

export const updateActivity = (activity) => {
  return axios
    .patch(`${BASE_URL}/api/v1/activities/${activity.id}`, activity)
    .then((res) => res.data);
};

export const deleteActivity = (id) => {
  return axios
    .delete(`${BASE_URL}/api/v1/activities/${id}`)
    .then((res) => res.data);
};
