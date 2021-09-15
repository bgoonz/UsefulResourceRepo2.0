import Service from "@ember/service";

export default Service.extend({
  totalPrice(daily_price, days) {
    if (days && daily_price) {
      return parseInt(daily_price, 10) * parseInt(days, 10);
    }

    return 0;
  },

  orderResults(results) {
    let groupedItems = [];
    const itemsPerRow = 3;

    let allItems = results.map((obj) => obj);
    while (allItems.length) {
      groupedItems.push(allItems.splice(0, itemsPerRow));
    }

    return groupedItems;
  },
});
