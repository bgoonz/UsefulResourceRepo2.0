import { types } from "../actions/types";

const filterByType = (filteredOffers, filteredType, searchText) => {
  var offersToReturn;

  offersToReturn = filteredOffers.filter((offer) => {
    var text = offer[filteredType].toLowerCase();
    return (
      searchText.length === 0 || text.indexOf(searchText.toLowerCase()) > -1
    );
  });

  return offersToReturn;
};

const countOccurences = (items) => {
  var maxOccurenceNum;

  if (items.length == 0) return null;
  var modeMap = {};
  var maxEl = items[0],
    maxCount = 1;
  for (var i = 0; i < items.length; i++) {
    var el = items[i];
    if (modeMap[el] == null) modeMap[el] = 1;
    else modeMap[el]++;
    if (modeMap[el] > maxCount) {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return {
    product: maxEl,
    count: maxCount,
  };
};

const getMostItems = (items) => {
  var originArray = items;
  var mostSoldItems = [];

  while (originArray.length > 0) {
    var mostSoldItem = countOccurences(originArray);
    mostSoldItems.push(mostSoldItem);

    originArray = originArray.filter(function (item) {
      return item !== mostSoldItem.product;
    });
  }

  return mostSoldItems;
};

module.exports = {
  filterOffers: (offers, filteredType, searchText) => {
    var filteredOffers = filterByType(offers, filteredType, searchText);

    return filteredOffers;
  },

  filterOffersByOrdes: (offers) => {
    var items = offers.map((offer) => {
      return offer.item;
    });

    var soldItems = getMostItems(items);

    return soldItems;
  },
};
