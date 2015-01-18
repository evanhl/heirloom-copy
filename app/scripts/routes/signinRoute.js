App.SigninRoute = Ember.Route.extend({
  setupController: function (controller) {
    controller.setup();
  },

  actions: {
    willTransition: function (transition) {
      if (transition.targetName === 'forgotPassword') {
        App.get('analytics').trackEvent('Signin.Actions.forgotPassword');
      }
    }
  }
});