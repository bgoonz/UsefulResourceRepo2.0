define([
  'lib/views/template',
  'text!tpl/food-meeting/new.hbs',
  'app/views/food-meeting/new-steps/signup',
  'app/views/food-meeting/new-steps/choose',
  'app/views/food-meeting/new-steps/invite',
  'app/views/food-meeting/new-steps/complete'
],
function (
  View,
  template,
  SignupView,
  ChooseView,
  InviteView,
  CompleteView
) {
  return View.extend({

    template: template,

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);

      this.on('change:step', this.render, this);

      this.signupView = new SignupView({
        model: this.model
      });

      this.chooseView = new ChooseView({
        model: this.model
      });

      this.inviteView = new InviteView({
        model: this.model
      });

      this.completeView = new CompleteView({
        model: this.model
      });

      this.signupView.on('done', _.bind(this.setStep, this, this.chooseView));
      this.chooseView.on('done', _.bind(this.setStep, this, this.inviteView));
      this.inviteView.on('done', this.save, this);

      this.setStep(this.signupView);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);

      return this.assign('.step', this.step);
    },

    setStep: function (step) {
      this.step = step;
      this.trigger('change:step', step);
      return this;
    },

    save: function () {
      this.model.save(null, {
        success: _.bind(this.setStep, this, this.completeView)
      });
    }
  });
});