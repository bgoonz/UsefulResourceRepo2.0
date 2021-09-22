import Vue from "vue";
import moment from "moment";

//Domyślna wartość formatowania 'LL'
Vue.filter("formatDate", (date, dateFormat = "LL") => {
  if (!date) {
    return "";
  }
  return moment(date).format(dateFormat);
});
