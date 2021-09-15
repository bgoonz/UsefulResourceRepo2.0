import { formatRelative, fromUnixTime } from "date-fns";

export const formatDate = date => {
  const now = new Date();
  return formatRelative(new Date(fromUnixTime(date / 1000)), now);
};
