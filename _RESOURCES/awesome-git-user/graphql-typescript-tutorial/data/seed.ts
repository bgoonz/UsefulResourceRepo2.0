import { v4 as uuidv4 } from "uuid";

export const users = [
  {
    id: uuidv4(),
    name: "Octavio Flores",
    email: "oflores@zcorp.com",
    password: "abc123",
  },
  {
    id: uuidv4(),
    name: "Farah Bennis",
    email: "fbennis@zcorp.com",
    password: "bbc123",
  },
  {
    id: uuidv4(),
    name: "Peter Quan",
    email: "pquan@zcorp.com",
    password: "cbc123",
  },
];

export const projects = [
  {
    title: "Site Upgrade - Login Form",
    status: "active",
  },
  {
    title: "Site Upgrade - User Dashboard",
    status: "active",
  },
  {
    title: "Server Migration",
    status: "completed",
  },
];

export const assignments = [
  {
    projectId: 1,
    userId: "03318b4c-df32-4050-8883-a08eca2beace",
  },
  {
    projectId: 2,
    userId: "03318b4c-df32-4050-8883-a08eca2beace",
  },
  {
    projectId: 1,
    userId: "9ac802d5-8b61-4314-96f4-7f76612d26c0",
  },
];
