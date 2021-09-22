import axios from "axios";
import types from "./types";

const errorHandler = (error) => {
  return {
    type: types.ERROR_RESPONSE,
    error,
  };
};

const createHeroSuccess = (resp) => {
  var heroes = resp.data;

  if (Object.keys(heroes).length === 2) {
    return {
      type: types.CREATE_HERO_MULTIPLE,
      heroes,
    };
  } else {
    return {
      type: types.CREATE_HERO,
      heroes,
    };
  }
};

export const createHero = (hero) => {
  return (dispatch) => {
    axios
      .post("/hero", hero)
      .then((response) => {
        dispatch(createHeroSuccess(response));
      })
      .catch((response) => {
        dispatch(errorHandler(response.data.error));
      });
  };
};

const fetchHeroesSuccess = (heroes) => {
  return {
    type: types.FETCH_HEROES,
    heroes: heroes.data,
  };
};

export const fetchHeroes = () => {
  return (dispatch) => {
    axios.get("/heroes").then((resp) => {
      return dispatch(fetchHeroesSuccess(resp));
    });
  };
};

const setRelationSuccess = (resp) => {
  return {
    type: types.CREATE_HERO,
    heroes: resp.data,
  };
};

export const setRelation = (values) => {
  return (dispatch) => {
    axios.post("/hero/rel", values).then((resp) => {
      return dispatch(fetchHeroesSuccess(resp));
    });
  };
};
