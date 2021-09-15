import { StateKeyProps } from "../customTypes";

console.log(process.env.REACT_APP_HOURLY_QUAKES_URL);

const quakeUrlHourly: any = process.env.REACT_APP_HOURLY_QUAKES_URL;
const quakeUrlDaily: any = process.env.REACT_APP_DAILY_QUAKES_URL;
const quakeUrlWeekly: any = process.env.REACT_APP_WEEKLY_QUAKES_URL;

export const stateKey: StateKeyProps = {
  1: { name: "Alabama", abbreviation: "AL" },
  2: { name: "Alaska", abbreviation: "AK" },
  4: { name: "Arizona", abbreviation: "AZ" },
  5: { name: "Arkansas", abbreviation: "AR" },
  6: { name: "California", abbreviation: "CA" },
  8: { name: "Colorado", abbreviation: "CO" },
  9: { name: "Connecticut", abbreviation: "CT" },
  10: { name: "Delaware", abbreviation: "DE" },
  12: { name: "Florida", abbreviation: "FL" },
  13: { name: "Georgia", abbreviation: "GA" },
  15: { name: "Hawaii", abbreviation: "HI" },
  16: { name: "Idaho", abbreviation: "ID" },
  17: { name: "Illinois", abbreviation: "IL" },
  18: { name: "Indiana", abbreviation: "IN" },
  19: { name: "Iowa", abbreviation: "IA" },
  20: { name: "Kansas", abbreviation: "KS" },
  21: { name: "Kentucky", abbreviation: "KY" },
  22: { name: "Louisiana", abbreviation: "LA" },
  23: { name: "Maine", abbreviation: "ME" },
  24: { name: "Maryland", abbreviation: "MD" },
  25: { name: "Massachusetts", abbreviation: "MA" },
  26: { name: "Michigan", abbreviation: "MI" },
  27: { name: "Minnesota", abbreviation: "MN" },
  28: { name: "Mississippi", abbreviation: "MS" },
  29: { name: "Missouri", abbreviation: "MO" },
  30: { name: "Montana", abbreviation: "MT" },
  31: { name: "Nebraska", abbreviation: "NEB" },
  32: { name: "Nevada", abbreviation: "NV" },
  33: { name: "New Hampshire", abbreviation: "NH" },
  34: { name: "New Jersey", abbreviation: "NJ" },
  35: { name: "New Mexico", abbreviation: "NM" },
  36: { name: "New York", abbreviation: "NY" },
  37: { name: "North Carolina", abbreviation: "NC" },
  38: { name: "North Dakota", abbreviation: "ND" },
  39: { name: "Ohio", abbreviation: "OH" },
  40: { name: "Oklahoma", abbreviation: "OK" },
  41: { name: "Oregon", abbreviation: "OR" },
  42: { name: "Pennsylvania", abbreviation: "PA" },
  44: { name: "Rhode Island", abbreviation: "RI" },
  45: { name: "South Carolina", abbreviation: "SC" },
  46: { name: "South Dakota", abbreviation: "SD" },
  47: { name: "Tennessee", abbreviation: "TN" },
  48: { name: "Texas", abbreviation: "TX" },
  49: { name: "Utah", abbreviation: "UT" },
  50: { name: "Vermont", abbreviation: "VT" },
  51: { name: "Virginia", abbreviation: "VA" },
  53: { name: "Washington", abbreviation: "WA" },
  54: { name: "West Virginia", abbreviation: "WV" },
  55: { name: "Wisconsin", abbreviation: "WI" },
  56: { name: "Wyoming", abbreviation: "WY" },
};

export const QuakeDataHourly = async () => {
  const result = await fetch(quakeUrlHourly);
  const data = await result.json();
  const quakes = await data.features.filter((feature: any) => {
    if (
      feature.geometry.coordinates[0] > -176.7417 &&
      feature.geometry.coordinates[0] < -66.947 &&
      feature.geometry.coordinates[1] > 22.0 &&
      feature.geometry.coordinates[1] < 71.3888
    ) {
      return feature;
    }
    return null;
  });
  return quakes;
};

export const QuakeDataDaily = async () => {
  const result = await fetch(quakeUrlDaily);
  const data = await result.json();
  const quakes = await data.features.filter((feature: any) => {
    if (
      feature.geometry.coordinates[0] > -176.7417 &&
      feature.geometry.coordinates[0] < -66.947 &&
      feature.geometry.coordinates[1] > 22.0 &&
      feature.geometry.coordinates[1] < 71.3888
    ) {
      return feature;
    }
    return null;
  });
  return quakes;
};

export const QuakeDataWeekly = async () => {
  const result = await fetch(quakeUrlWeekly);
  const data = await result.json();
  const quakes = await data.features.filter((feature: any) => {
    if (
      feature.geometry.coordinates[0] > -176.7417 &&
      feature.geometry.coordinates[0] < -66.947 &&
      feature.geometry.coordinates[1] > 22.0 &&
      feature.geometry.coordinates[1] < 71.3888
    ) {
      return feature;
    }
    return null;
  });
  return quakes;
};
