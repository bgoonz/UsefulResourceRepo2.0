const fetch = require("node-fetch");
const fs = require("fs");

const yesterdayCountryData = require("../src/data/country/history/covid19200614.json");
const yesterdayProvinceData = require("../src/data/province/history/covid19200614.json");
const yesterdayWorldData = require("../src/data/world/history/worldtotal200614.json");
const url =
  "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-16-2020.csv";

const getAllData = async () => {
  let covid19Data = [];
  let covid19DataArray = [];
  await fetch(url)
    .then((response) => {
      return response.text();
    })
    .then(async (data) => {
      let rows = await data.split("\n").slice(1);
      try {
        await rows.forEach((row) => {
          let countryData = {};
          let datestring;
          let country = row.split(",").slice(0, 11);
          if (!country[3].includes('"')) {
            datestring = country[4].split("T")[0];
            countryData = {
              fips: country[0],
              admin: country[1],
              province: country[2],
              country: country[3],
              updated: datestring,
              confirmed: country[7],
              deaths: country[8],
              recovered: country[9],
              latitude: country[5],
              longitude: country[6],
            };
          } else {
            datestring = country[5].split("T")[0];
            countryData = {
              fips: country[0],
              admin: country[1],
              province: country[2],
              country: `${country[3].replace(/"/, "")}, ${country[4].replace(
                /"/,
                ""
              )}`,
              updated: datestring,
              confirmed: country[8],
              deaths: country[9],
              recovered: country[10],
              latitude: country[6],
              longitude: country[7],
            };
          }

          covid19Data.push(countryData);
        });
      } catch {
        console.log("Cannot read property `split` of undefined");
      }

      covid19DataArray = await JSON.stringify(covid19Data);
      await fs.writeFileSync("src/data/all/covid19.json", covid19DataArray);
      await fs.writeFileSync(
        "src/data/all/history/covid19200616.json",
        covid19DataArray
      );
    });
  return covid19Data;
};

const getCountryList = async () => {
  let countries = [];
  await fetch(url)
    .then((response) => {
      return response.text();
    })
    .then(async (data) => {
      let rows = await data.split("\n").slice(1);
      try {
        await rows.forEach((row, i) => {
          let country = row.split(",");
          if (!country[3].includes('"')) {
            if (!countries.includes(country[3])) {
              countries.push(country[3]);
            }
          } else {
            if (
              !countries.includes(
                `${country[3].replace(/"/, "")}, ${country[4].replace(/"/, "")}`
              )
            ) {
              countries.push(
                `${country[3].replace(/"/, "")}, ${country[4].replace(/"/, "")}`
              );
            }
          }
        });
      } catch {
        console.log("Oh noes!");
      }
    });
  return countries;
};
const getProvinceList = async () => {
  let provinces = [];
  await fetch(url)
    .then((response) => {
      return response.text();
    })
    .then(async (data) => {
      let rows = await data.split("\n").slice(1);
      try {
        await rows.forEach((row, i) => {
          let country = row.split(",");
          if (country[2] !== "") {
            if (!provinces.includes(country[2])) {
              provinces.push(country[2]);
            }
          }
        });
      } catch {
        console.log("Oh noes!");
      }
    });
  return provinces;
};

const getCountryData = async () => {
  let countryData = [];
  let countries = await getCountryList();
  let allData = await getAllData();
  await countries.forEach(async (nation) => {
    let confirmedCount = 0;
    let deathCount = 0;
    let updatedDate = "";
    try {
      for (let country of allData) {
        if (nation === country.country) {
          confirmedCount = confirmedCount + Number(country.confirmed);
          deathCount = deathCount + Number(country.deaths);
          updatedDate = country.updated;
        }
      }
      await countryData.push({
        country: nation,
        confirmed: confirmedCount,
        deaths: deathCount,
        updated: updatedDate,
      });
    } catch {
      console.log("Prolly bad");
    }
  });
  return countryData;
};

const getProvinceData = async () => {
  let provinceData = [];
  let provinces = await getProvinceList();
  let allData = await getAllData();
  await provinces.forEach(async (province) => {
    let confirmedCount = 0;
    let deathCount = 0;
    let updatedDate = "";
    let nation;
    try {
      for (let country of allData) {
        if (province === country.province) {
          confirmedCount = confirmedCount + Number(country.confirmed);
          deathCount = deathCount + Number(country.deaths);
          nation = country.country;
          updatedDate = country.updated;
        }
      }
      await provinceData.push({
        province: province,
        country: nation,
        confirmed: confirmedCount,
        deaths: deathCount,
        updated: updatedDate,
      });
    } catch {
      console.log("Prolly bad");
    }
  });
  return provinceData;
};

const getWorldTotal = async () => {
  let total = await getAllData();
  let worldData = [];
  let totalConfirmedCount = 0;
  let totalDeathCount = 0;
  for (let item of total) {
    totalConfirmedCount = totalConfirmedCount + Number(item.confirmed);
  }
  for (let elem of total) {
    totalDeathCount = totalDeathCount + Number(elem.deaths);
  }
  const worldTotal = {
    totalConfirmedCases: totalConfirmedCount,
    totalDeaths: totalDeathCount,
    date: `${
      new Date().getMonth() + 1
    }/${new Date().getDate()}/${new Date().getFullYear()}`,
  };
  worldData.push(worldTotal);
  // let worldDataArray = JSON.stringify(worldData)
  // fs.writeFileSync("src/data/world/worldtotal.json", worldDataArray)
  // fs.writeFileSync("src/data/world/history/worldtotal200321.json", worldDataArray)
  return worldData;
};

const makeWorldTotalFile = async () => {
  let oldWorldData = await yesterdayWorldData;
  let worldData = await getWorldTotal();
  let worldCasesArray = [];
  let stringyWorldCasesArray = [];
  await worldData.forEach((day) => {
    let newCases = 0;
    let newDeaths = 0;
    try {
      for (let total of oldWorldData) {
        newCases =
          Number(day.totalConfirmedCases) - Number(total.totalConfirmedCases);
        newDeaths = Number(day.totalDeaths) - Number(total.totalDeaths);
      }
    } catch {
      console.log("Could not get world data");
    }
    worldCasesArray.push({
      totalConfirmedCases: day.totalConfirmedCases,
      totalDeaths: day.totalDeaths,
      date: day.date,
      newCases: newCases,
      newDeaths: newDeaths,
    });
  });
  stringyWorldCasesArray = JSON.stringify(worldCasesArray);
  fs.writeFileSync("src/data/world/worldtotal.json", stringyWorldCasesArray);
  fs.writeFileSync(
    "src/data/world/history/worldtotal200616.json",
    stringyWorldCasesArray
  );
};

const makeCountryDataFile = async () => {
  const oldCountryData = await yesterdayCountryData;
  const countries = await getCountryData();
  let countryCasesArray = [];
  let stringyCountryCasesArray = [];
  await countries.forEach((nation) => {
    let newCases = 0;
    let newDeaths = 0;
    try {
      for (let country of oldCountryData) {
        if (nation.country === country.country) {
          newCases = Number(nation.confirmed) - Number(country.confirmed);
          newDeaths = Number(nation.deaths) - Number(country.deaths);
        }
      }
    } catch {
      console.log("Failed to match country data");
    }
    countryCasesArray.push({
      country: nation.country,
      confirmed: nation.confirmed,
      deaths: nation.deaths,
      updated: nation.updated,
      newCases: newCases,
      newDeaths: newDeaths,
    });
  });
  stringyCountryCasesArray = JSON.stringify(countryCasesArray);
  fs.writeFileSync("src/data/country/covid19.json", stringyCountryCasesArray);
  fs.writeFileSync(
    "src/data/country/history/covid19200616.json",
    stringyCountryCasesArray
  );
};
const makeProvinceDataFile = async () => {
  const oldProvinceData = await yesterdayProvinceData;
  const provinces = await getProvinceData();
  let provinceCasesArray = [];
  let stringyProvinceCasesArray = [];
  await provinces.forEach((province) => {
    let newCases = 0;
    let newDeaths = 0;
    try {
      for (let country of oldProvinceData) {
        if (province.province === country.province) {
          newCases = Number(province.confirmed) - Number(country.confirmed);
          newDeaths = Number(province.deaths) - Number(country.deaths);
        }
      }
    } catch {
      console.log("Failed to match country data");
    }
    provinceCasesArray.push({
      province: province.province,
      country: province.country,
      confirmed: province.confirmed,
      deaths: province.deaths,
      updated: province.updated,
      newCases: newCases,
      newDeaths: newDeaths,
    });
  });
  stringyProvinceCasesArray = JSON.stringify(provinceCasesArray);
  fs.writeFileSync("src/data/province/covid19.json", stringyProvinceCasesArray);
  fs.writeFileSync(
    "src/data/province/history/covid19200616.json",
    stringyProvinceCasesArray
  );
};

makeWorldTotalFile();
makeCountryDataFile();
makeProvinceDataFile();
