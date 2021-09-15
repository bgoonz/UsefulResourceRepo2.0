const filterByTextImpl = (cars, filterType, searchText) => {
  var filteredCars;

  filteredCars = cars.filter((car) => {
    var text = car[filterType].toLowerCase();
    return (
      searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1
    );
  });

  return filteredCars;
};

const countNumOfPagesImp = (numOfCars) => {
  var pages, leftCars;
  this.setOveralNumOfCars(numOfCars.toString());

  pages = Math.floor(numOfCars / 10); // pages
  leftCars = numOfCars % 10; // cars

  if (leftCars !== 0 && leftCars < 10) {
    pages += 1;
  }

  return pages;
};

module.exports = {
  parseJson: function (jsonObj) {
    var arr = [];
    Object.keys(jsonObj).map(function (el) {
      arr.push(jsonObj[el]);
    });

    return arr;
  },

  filterByText: (cars, filterType, searchText) => {
    return filterByTextImpl(cars, filterType, searchText);
  },

  countNumberOfPages: (numOfCars) => {
    return countNumOfPagesImp(numOfCars);
  },
};
