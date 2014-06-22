App.ApplicationController = Ember.Controller.extend({
  needs: ['photos'],

  userFullName: function () {
    return App.get('auth.currentSession.name');
  }.property('App.auth.currentSession.name'),

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  isLoggedInChanged: function () {
    if (!this.get('isLoggedIn')) {
      this.softSignOut();
    }
  }.observes('isLoggedIn'),

  // TODO: signin transition could be abrupt if token is expired remotely with no user action
  // implement warning banner, e.g. "You've been unexpectedly logged out"
  softSignOut: function () {
    // just the client side part of signing out
    // only invoke if server session has already expired
    this.transitionToRoute('signin');
    this.get('controllers.photos').reset();
  },

  actions: {
    signout: function () {
      var self = this;
      // dummy record is required to delete record
      var session = App.Session.create();

      session.deleteRecord().then(function () {
        App.set('auth.currentSession', null);
      }, function () {
        // TODO: handle error
      });
    }
  }
});

