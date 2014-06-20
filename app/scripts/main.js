/* jshint -W079 */

// Adapted from http://stackoverflow.com/a/10199338
Ember.Object.reopen({
  // allows us to get raw object from any Ember.Object so that we can serialize to localStorage
  getJson: function() {
    var v, ret = [];

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        v = this[key];

        if (v === 'toString') {
          continue;
        }

        if (Ember.typeOf(v) === 'function') {
          continue;
        }

        ret.push(key);
      }
    }

    return this.getProperties.apply(this, ret);
  }
});

// TODO: use deferReadiness for auth
var App = Ember.Application.create({
});

// TODO: abstract localStorage so that classes don't have to directly interact with it
App.Authorization = Ember.Object.extend({
  currentSession: (localStorage.getItem('currentSession') ? Ember.Object.create(JSON.parse(localStorage.getItem('currentSession'))) : null),
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
      localStorage.setItem('currentSession', JSON.stringify(this.get('currentSession').getJson()));
    } else {
      localStorage.removeItem('currentSession');
    }

  }.observes('currentSession').on('init')
});

App.set('auth', new App.Authorization());

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function () {
  this.resource('photos', function () {
    this.resource('photo', { path: 'photo/:photo_id' });
  });
  this.resource('albums');
  this.resource('album', { path: 'album/:album_id' }, function () {
    this.resource('albumPhotos', { path: 'photos' });
  });
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
