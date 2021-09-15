import resources from "./data.json";

const delay = (delay) => {
  return new Promise((res) => {
    setTimeout(res, delay);
  });
};

const apiCall = async (operation, time = 1000) => {
  await delay(time);
  const results = await operation();
  return results;
};

export function fetchResources() {
  return apiCall(() => resources);
}

export function fetchUser() {
  return apiCall(() => ({ name: "Filip" }), 2000);
}
