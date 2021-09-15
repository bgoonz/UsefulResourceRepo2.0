define([
  'lib/views/template',
  'text!tpl/food-meeting/poll.hbs',
  'app/models/food-meeting',
  'app/collections/polls'
], function (
  View,
  template,
  FoodMeeting,
  Polls
) {
  return View.extend({

    template: template,

    events: {
      'submit form': 'onSubmit'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.email = this.options.email || null;
      this.hash = this.options.hash || null;

      this.loaded = false;

      this.foodMeeting = new FoodMeeting({
        _id: this.model.get('foodMeeting')
      });

      this.foodMeeting.on('change:users', this.checkUser, this);
      this.foodMeeting.on('change', this.render, this);
      this.on('loaded', this.render, this);

      this.foodMeeting.fetch();
      this.loadPoll();
    },

    checkUser: function () {
      var user = this.foodMeeting.findUserByEmail(this.email);

      if (!user || user.hash !== this.hash) {
        alert('Vous êtes tombé au mauvais endroit au mauvais moment, retour à la case départ.');
        window.location = '/';
      }
    },

    toJSON: function () {
      var data = View.prototype.toJSON.apply(this, arguments);

      data.foodMeeting = this.foodMeeting.toJSON();
      data.loaded = this.loaded;
      data.alreadyVoted = ! this.model.isNew();

      return data;
    },

    onSubmit: function (event) {
      event.preventDefault();

      var venueId = this.$('[name=venue]:checked').val();

      if (! venueId) {
        return alert('Vous devez choisir un restaurant.');
      }

      this.model.set('venue', venueId);
      this.model.set('email', this.email);
      console.log(this.model.attributes);
      this.model.save(null, {
        success: _.bind(this.render, this)
      });
    },

    loadPoll: function () {
      (new Polls())
      .on('reset', _.bind(function (polls) {
        if (polls.length) {
          this.model.set(polls.at(0).toJSON());
        }
        this.loaded = true;
        this.trigger('loaded');
      }, this))
      .fetch({
        data: {
          email: this.email,
          current: true,
          foodMeeting: this.model.get('foodMeeting')
        },
        reset: true
      });
    }
  });
});