App.IndexRoute = Ember.Route.extend({
  beforeModel: function () {
    if (App.get('auth.isLoggedIn')) {
      this.transitionTo('photos');
    }
  },

  actions: {
    willTransition: function (transition) {
      if (transition.targetName === 'signin') {
        App.get('analytics').trackEvent('Home.Actions.signin');
      } else if (transition.targetName === 'registration') {
        App.get('analytics').trackEvent('Home.Actions.signup');
      }
    }
  }
});
