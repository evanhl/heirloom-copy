App.ApplicationController = Ember.Controller.extend({
  needs: ['photos'],

  userFullName: function () {
    return App.get('auth.currentSession.name');
  }.property('App.auth.currentSession.name'),

  isLoggedIn: function () {
    return App.get('auth.isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  actions: {
    signout: function () {
      var self = this;
      var adapter = this.store.adapterFor('application');

      adapter.ajax(adapter.buildURL('session'), 'DELETE').then(function () {
        // TODO: don't maintain separate session and authToken
        App.set('auth.currentSession', null);

        self.transitionToRoute('signin');
        self.get('controllers.photos').reset();
      }, function () {
        // TODO: handle error
      });
    }
  }
});

