//= require ./app
//= require ./models/session

// TODO: abstract localStorage so that classes don't have to directly interact with it
App.Authorization = Ember.Object.extend({
  currentSession: function () {
    return (localStorage.getItem('currentSession') ? App.Session.create(JSON.parse(localStorage.getItem('currentSession'))) : null);
  }.property(),
  authToken: Ember.computed.alias('currentSession.authentication_token'),

  isLoggedIn: function () {
    return !!this.get('authToken');
  }.property('authToken'),

  currentSessionChanged: function () {
    var self = this;

    Ember.$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
      if (self.get('authToken')) {
        jqXhr.setRequestHeader("X-User-Token", self.get('authToken'));
      }
    });

    if (this.get('currentSession')) {
      localStorage.setItem('currentSession', JSON.stringify(this.get('currentSession').toJSON()));
    } else {
      localStorage.removeItem('currentSession');
    }

  }.observes('currentSession').on('init')
});

App.set('auth', App.Authorization.create());