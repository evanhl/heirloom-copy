App.ShareController = Ember.ObjectController.extend({
  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  isLoggedOut: function () {
    return !this.get('isLoggedIn');
  }.property('isLoggedIn'),

  isAndroidOrIos: function () {
    return Utils.isIos() || Utils.isAndroid();
  }.property()
});