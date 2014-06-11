App.ApplicationController = Ember.Controller.extend({
  needs: ['photos'],
  userFullName: function () {
    return App.get('currentSession.name');
  }.property('App.currentSession.name'),

  isLoggedIn: function () {
    return App.auth.get('isLoggedIn');
  }.property('App.auth.isLoggedIn'),

  actions: {
    signout: function () {
      var self = this;
      var adapter = this.store.adapterFor('application');

      adapter.ajax(adapter.buildURL('session'), 'DELETE').then(function () {
        // TODO: don't maintain separate session and authToken
        App.set('currentSession', null);
        App.auth.set('authToken', null);

        self.transitionToRoute('signin');
        self.get('controllers.photos').reset();
      }, function () {
        // TODO: handle error
      });
    }
  }
});
