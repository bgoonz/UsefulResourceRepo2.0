const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET_STATE_QUAKES_HOURLY":
      return {
        quakes: state.quakesHourly.filter((quake: any) => {
          return quake.id === action.payload;
        }),
      };
    case "GET_STATE_QUAKES_DAILY":
      return {
        quakes: state.quakesDaily.filter((quake: any) => {
          return quake.id === action.payload;
        }),
      };
    case "GET_STATE_QUAKES_WEEKLY":
      return {
        quakes: state.quakesWeekly.filter((quake: any) => {
          return quake.id === action.payload;
        }),
      };
    default:
      return state;
  }
};

export default AppReducer;
