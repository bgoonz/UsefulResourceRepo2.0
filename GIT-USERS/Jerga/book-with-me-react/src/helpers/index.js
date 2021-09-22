import * as moment from "moment";
import titleize from "titleize";

export const toUpperCase = (sentence) => {
  return sentence ? titleize(sentence) : "";
};

export const resolveType = (isShared) => {
  return isShared ? "shared" : "whole";
};

export const getRangeOfDates = (start_at, end_at) => {
  let start = new Date(start_at);
  const end = new Date(end_at);
  const dateArr = [];

  while (start <= end) {
    dateArr.push(moment(start).format("Y-MM-DD"));
    const newDate = start.setDate(start.getDate() + 1);
    start = new Date(newDate);
  }

  return dateArr;
};

export const formatDate = (momentDate) => {
  return momentDate.format("Y-MM-DD");
};
