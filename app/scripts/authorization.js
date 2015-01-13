//= require ./app
//= require ./models/session

App.Authorization = Ember.Object.extend({
  currentSession: null,

  init: function () {
    var lsCurrentSession;
    var basilCurrentSession;
    var currentSession;
    var sessionModel;
    var self = this;

    this._super();

    // fallback to grandfather in users who signed in before basil
    try {
      lsCurrentSession = localStorage.getItem('currentSession');
    } catch (err) {}

    basilCurrentSession = App.get('basil').get('currentSession');
    currentSession = basilCurrentSession || lsCurrentSession;

    if (currentSession) {
      sessionModel = App.Session.createFromJson(JSON.parse(currentSession));
      this.set('currentSession', sessionModel);
      this.setupHeaders();

      this.get('currentSession').reload().then(function () {
        self.persistSession();
      });
    }
  },

  authToken: Ember.computed.alias('currentSession.authentication_token'),

  isLoggedIn: function () {
    return !!this.get('authToken');
  }.property('authToken'),

  setupHeaders: function () {
    var self = this;

    Ember.$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
      var isApiRequest = options.url.indexOf(HLConfig.HOSTNAME) !== -1;
      if (self.get('authToken') && isApiRequest) {
        jqXhr.setRequestHeader("X-User-Token", self.get('authToken'));
      }
    });
  },

  currentSessionChanged: function () {
    this.setupHeaders();
    this.persistSession();
  }.observes(
    'currentSession',
    'currentSession.username',
    'currentSession.name',
    'currentSession.email',
    'currentSession.authentication_token'
  ).on('init'),

  persistSession: function () {
    if (this.get('currentSession')) {
      App.get('basil').set('currentSession', JSON.stringify(this.get('currentSession').toJSON()));
    } else {
      App.get('basil').remove('currentSession');
      try {
        localStorage.removeItem('currentSession');
      } catch (err) {}
    }
  }
});

App.set('auth', App.Authorization.create());
