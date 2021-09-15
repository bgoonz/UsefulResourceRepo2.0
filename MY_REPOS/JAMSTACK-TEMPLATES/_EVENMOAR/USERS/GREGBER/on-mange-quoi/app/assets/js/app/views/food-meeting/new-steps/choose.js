define([
  'lib/views/template',
  'text!tpl/food-meeting/new-steps/choose.hbs',
  'app/collections/venues'
],
function (
  View,
  template,
  Venues
) {
  return View.extend({

    template: template,

    events: {
      'submit form'                  : 'onSubmit',
      'change .venue [type=checkbox]': 'onToggleVenue',
      'click  .retry'                : 'onClickRetry'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.position = null;
      this.locationError = false;
      this.collection = new Venues();

      this.collection.on('reset', this.render, this);
      this.on('localize', this.refreshFromPosition, this);

      this.localize();
    },

    toJSON: function () {
      return _.extend(View.prototype.toJSON.apply(this, arguments), {
        locationError: this.locationError,
        position: this.position
      });
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      _.each(this.model.get('venues'), _.bind(function (venue) {
        this.$('.venue[data-id=' + venue.id + '] [type=checkbox]').prop('checked', true);
      }, this));

      return this;
    },

    onSubmit: function (event) {
      event.preventDefault();

      this.trigger('done');
    },

    onToggleVenue: function (event) {
      var $checkbox = $(event.currentTarget),
      venue = this.collection.get($checkbox.parents('.venue').data('id')),
      venues = new Venues(this.model.get('venues'));

      if ($checkbox.is(':checked')) {
        venues.add(venue);
      }
      else {
        venues.remove(venue);
      }

      this.model.set('venues', venues.toJSON());
    },

    setLocationError: function (value) {
      this.locationError = value;
      this.render();
    },

    onClickRetry: function (event) {
      event.preventDefault();
      this.setLocationError(false);
      this.localize();
    },

    localize: function () {
      navigator.geolocation.getCurrentPosition(_.bind(function (position) {
        this.position = position;
        this.trigger('localize', this.position);
      }, this), _.bind(function (error) {
        this.setLocationError(error);
        this.render();
      }, this), {timeout: 5000});
    },

    refreshFromPosition: function (position) {
      this.collection.fetch({
        data: {
          ll: position.coords.latitude + ',' + position.coords.longitude,
          llAcc: position.coords.accuracy
        },
        reset: true,
        error: _.bind(function () {
          this.setLocationError(true);
        }, this)
      });
    }
  });
});