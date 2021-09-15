import { formatRelative } from "date-fns";

export const formatDate = date => {
  const now = new Date();
  return formatRelative(new Date(date), now);
};
