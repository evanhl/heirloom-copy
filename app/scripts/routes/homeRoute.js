App.HomeRoute = Ember.Route.extend({
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
