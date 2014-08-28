App.IndexRoute = Ember.Route.extend({
  beforeModel: function () {
    if (App.get('auth.isLoggedIn')) {
      this.transitionTo('photoGroupings');
    } else {
      this.transitionTo('signin');
    }
  }
});
