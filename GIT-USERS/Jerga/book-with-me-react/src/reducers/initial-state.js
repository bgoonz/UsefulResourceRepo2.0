export const INITIAL_STATE = {
  rentals: {
    items: [],
    isFetching: false,
    isSearch: false,
    searchCity: "",
    errors: [],
  },
  rental: {
    item: {},
    isFetching: false,
  },
  auth: initAuthState(),
  booking: {
    item: {},
    isBooked: false,
    errors: [],
  },
  bookings: {
    items: [],
    isFetching: false,
    errors: [],
  },
};

function initAuthState() {
  const token = localStorage.getItem("auth_token");

  return {
    token: token ? token : "",
    errors: [],
    isAuth: token ? true : false,
    username: "",
  };
}
