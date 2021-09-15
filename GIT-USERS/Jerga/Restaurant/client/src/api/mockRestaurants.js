import delay from "./delay";

// This file mocks a web API by working with the hard-coded data below.
// All calls return promises.

const restaurants = [
  {
    id: "nf23n89f32f7237923f82",
    name: "La Paris",
    capacity: 89,
    wifi: "no",
    smoking: "no",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/7QrdLOjP6nCAT6JGfym-rD4xLFjIDDFQyY5cDcjjXQwLAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "3243243248924324jkh",
    category: "restaurant",
  },
  {
    id: "092380df09d8sd809f0",
    name: "Indiana",
    capacity: 55,
    wifi: "yes",
    smoking: "yes",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/ObqewWGw1zIHvuZ5JS-_Yqhzj5WGrOlRGLanJGUTvTsLAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "s7d9s9d9sas79d7as",
    category: "restaurant",
  },
  {
    id: "8979as8d89sad9a798dsa987",
    name: "Borsalino",
    capacity: 44,
    wifi: "yes",
    smoking: "no",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/JZUInIhyYZj1_jZ3VrNAbLM2tFinXnIPxLRPFnU4g3ULAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "asdajsidsa89d7as798",
    category: "restaurant",
  },
  {
    id: "asd8asd8sa9d09s08jsadln",
    name: "Magnifica",
    capacity: 155,
    wifi: "no",
    smoking: "yes",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/O82O9uBm20LqlvJ1ZnTajbZVotWIQr1Nqfbzl21Oht0LAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "smoiygas564655as6d67",
    category: "restaurant",
  },
  {
    id: "das786g76a9s9sa7f",
    name: "Havana",
    capacity: 88,
    wifi: "yes",
    smoking: "yes",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/Y5ZpjHi4VngFLrfEQfKmAWK4xERWsPcTSL7eSpaydo4LAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "dvsyas97da9d998",
    category: "restaurant",
  },
  {
    id: "7sad7sd8sa8d9sa7d98",
    name: "Italiana",
    capacity: 33,
    wifi: "no",
    smoking: "no",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/_BkgwPRXlgYTRMMiQawowvwQ-nMi3rt_HZmsqO9yln0LAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "ddnskjfnkds879879",
    category: "restaurant",
  },
  {
    id: "sd897fsaf79sannkslas",
    name: "Belagio",
    capacity: 245,
    wifi: "yes",
    smoking: "yes",
    photoUrl:
      "https://content-na.drive.amazonaws.com/cdproxy/templink/eXIrL6_zIWBllhYHk8s2UCCi1gpsvBn2tMcFtdRfTY0LAYspN/alt/thumb?viewBox=1647",
    daily: [
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 500,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 222,
      },
      {
        name: "mock",
        alergens: [1, 2, 5, 6],
        description: "mock description",
        price: 5,
        weight: 111,
      },
    ],
    ownerId: "anaiusds87adsad89as7",
    category: "restaurant",
  },
];

class RestaurantApi {
  static getAllRestaurants() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], restaurants));
      }, delay);
    });
  }
}

export default RestaurantApi;
