import Service from "@ember/service";
import moment from "moment";

export default Service.extend({
  getRangeOfDates(start_at, end_at) {
    let start = new Date(start_at);
    const end = new Date(end_at);
    const dateArr = [];

    while (start < end) {
      dateArr.push(moment(start).format("Y-MM-DD"));
      const newDate = start.setDate(start.getDate() + 1);
      start = new Date(newDate);
    }

    return dateArr;
  },
});
