import { rentalData } from "./data";

const store = {
  rentals: () => {
    return rentalData;
  },
  data1: () => ["1", "2", "3"],
  data2: () => ["a", "b", "c"],
  someData: (state = "Default Data", action) => {
    if (action.type === "SOME_TYPE") {
      return action.payload;
    }

    return state;
  },
};

export default store;
