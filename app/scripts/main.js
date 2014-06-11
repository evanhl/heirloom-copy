/* jshint -W079 */

var App = Ember.Application.create({
  currentSession: null
});

App.Authorization = Ember.Object.extend({
  authToken: localStorage.getItem('authToken'),

  isLoggedIn: function () {
    return !!this.get('authToken');
  }.property('authToken'),

  authTokenChanged: function () {
    var self = this;

    Ember.$.ajaxPrefilter(function(options, originalOptions, jqXhr) {
      if (self.get('authToken')) {
        jqXhr.setRequestHeader("X-User-Token", self.get('authToken'));
      }
    });

    if (this.get('authToken')) {
      localStorage.setItem('authToken', this.get('authToken'));
    } else {
      localStorage.removeItem('authToken');
    }

  }.observes('authToken').on('init')
});

App.auth = new App.Authorization();

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('photos', function () {
    this.resource('photo', { path: 'photo/:photo_id' });
  });
  this.resource('albums');
  this.route('upload');
  this.route('registration');
  this.route('signin');
  this.route('signout');
});

DS.RESTSerializer.reopen({
  // removes root element from requests
  normalizePayload: function(type, payload) {
    var newPayload = {};

    newPayload[type.typeKey] = payload;

    return newPayload;
  },

  // removes root element from responses
  serializeIntoHash: function(hash, type, record, options) {
    var serialized = this.serialize(record, options);

    Object.keys(serialized).forEach(function (key) {
      hash[key] = serialized[key];
    });
  }
});
