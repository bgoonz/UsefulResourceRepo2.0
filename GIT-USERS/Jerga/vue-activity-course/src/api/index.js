import fakeApi from "@/lib/fakeApi";

const generateUid = () => Math.floor(new Date() * Math.random());

export const fetchActivities = () => {
  debugger;
  return fakeApi.get("activities", { force: 1 });
};

export const fetchCategories = () => {
  return fakeApi.get("categories", { force: 1 });
};

export const fetchUser = () => {
  return {
    name: "Filip Jerga",
    id: "-Aj34jknvncx98812",
  };
};

export const createActivityAPI = (activity) => {
  activity.id = generateUid();
  activity.progress = 0;
  activity.createdAt = new Date();
  activity.updatedAt = new Date();

  return fakeApi.post("activities", activity);
};

export const deleteActivityAPI = (activity) => {
  return fakeApi.delete("activities", activity);
};
