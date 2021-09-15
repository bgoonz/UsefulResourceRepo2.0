import { baseUrl } from "../config";

export const getPokemon = async (token) => {
  const response = await fetch(`${baseUrl}/pokemon`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    return [];
  }
};

export const getOnePokemon = async (id, token) => {
  const response = await fetch(`${baseUrl}/pokemon/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    return {};
  }
};

export const getPokemonTypes = async (token) => {
  const response = await fetch(`${baseUrl}/pokemon/types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    return [];
  }
};

export const createPokemon = async (data, token) => {
  const response = await fetch(`${baseUrl}/pokemon`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return true;
  }
};