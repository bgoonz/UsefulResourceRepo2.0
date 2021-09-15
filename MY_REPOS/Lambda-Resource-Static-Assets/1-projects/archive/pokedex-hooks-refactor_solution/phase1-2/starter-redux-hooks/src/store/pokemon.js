import { baseUrl } from "../config";

const HIDE_FORM = "pokedex/authentication/HIDE_FORM";
const LOAD = "pokedex/authentication/LOAD";
const LOAD_TYPES = "pokedex/authentication/LOAD_TYPES";
const SET_CURRENT = "pokedex/authentication/SET_CURRENT";
const SHOW_FORM = "pokedex/authentication/SHOW_FORM";

export const hideForm = () => ({ type: HIDE_FORM });
export const load = (list) => ({ type: LOAD, list });
export const loadTypes = (types) => ({ type: LOAD_TYPES, types });
export const setCurrent = (current) => ({ type: SET_CURRENT, current });
export const showForm = () => ({ type: SHOW_FORM });

export const createPokemon = (data) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    dispatch(hideForm());
    dispatch(getPokemon());
  }
};

export const getOnePokemon = (id) => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/pokemon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const current = await response.json();
    dispatch(setCurrent(current));
  }
};

export const getPokemon = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/pokemon`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getPokemonTypes = () => async (dispatch, getState) => {
  const {
    authentication: { token },
  } = getState();
  const response = await fetch(`${baseUrl}/pokemon/types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(loadTypes(list));
  }
};

export default function reducer(state = { types: [] }, action) {
  switch (action.type) {
    case HIDE_FORM: {
      return {
        ...state,
        formVisible: false,
      };
    }

    case LOAD: {
      return {
        ...state,
        list: action.list,
      };
    }

    case LOAD_TYPES: {
      return {
        ...state,
        types: action.types,
      };
    }

    case SET_CURRENT: {
      return {
        ...state,
        current: action.current,
      };
    }

    case SHOW_FORM: {
      return {
        ...state,
        formVisible: true,
      };
    }

    default:
      return state;
  }
}
