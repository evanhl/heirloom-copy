App.ShareController = Ember.ObjectController.extend({
  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn')
});