App.ApplicationController = Ember.Controller.extend({
  userFullName: function () {
    return App.get('currentSession.name');
  }.property('App.currentSession.name'),

  isLoggedIn: function () {
    return !!App.get('currentSession');
  }.property('App.currentSession')
});
