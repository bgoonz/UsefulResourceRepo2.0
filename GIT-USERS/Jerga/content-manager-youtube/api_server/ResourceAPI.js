import resources from "./data.json";

const delay = (time = 100) => {
  return new Promise((r, _) => {
    setTimeout(() => r(), time);
  });
};

export default {
  fetchResource: async (id) => {
    await delay(50);
    const resource = resources.find((r) => r.id === id);
    return { json: async () => resource };
  },
  fetchResources: async () => {
    await delay(50);
    return { json: async () => resources };
  },
};
