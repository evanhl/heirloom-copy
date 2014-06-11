App.ApplicationRoute = Ember.Route.extend({
  beforeModel: function () {
    if (!App.auth.get('isLoggedIn')) {
      this.transitionTo('signin');
    }
  }
});
