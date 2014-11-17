//= require ./app
//= require ./models/session

App.Authorization = Ember.Object.extend({
  currentSession: null,

  init: function () {
    var lsCurrentSession;
    var basilCurrentSession;
    var currentSession;

    this._super();

    // fallback to grandfather in users who signed in before basil
    try {
      lsCurrentSession = localStorage.getItem('currentSession');
    } catch (err) {}

    basilCurrentSession = App.get('basil').get('currentSession');
    currentSession = basilCurrentSession || lsCurrentSession;

    if (currentSession) {
      this.set('currentSession', App.Session.create(JSON.parse(currentSession)));
    }
  },

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
      App.get('basil').set('currentSession', JSON.stringify(this.get('currentSession').toJSON()));
    } else {
      App.get('basil').remove('currentSession');
      try {
        localStorage.removeItem('currentSession');
      } catch (err) {}
    }

  }.observes('currentSession').on('init')
});

App.set('auth', App.Authorization.create());
