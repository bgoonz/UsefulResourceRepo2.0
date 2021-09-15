var knex = require("knex")(require("./knexfile"));
var bookshelf = require("bookshelf")(knex);

var Events = bookshelf.Model.extend({
  tableName: "events",
});

function findEventByEventCode(eventCode) {
  return Events.where({ eventCode: eventCode })
    .fetch()
    .then(function (event) {
      return event.toJSON();
    })
    .catch(function (err) {
      console.error(err);
    });
}

module.exports = { findEventByEventCode };
