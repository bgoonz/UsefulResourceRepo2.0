import * as api from "./api";

export const create = (values: TUserInput) => api.post("/users")(values);
export const list = api.get("/users");
