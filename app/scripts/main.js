/* jshint -W079 */

var App = Ember.Application.create({});

App.httpHeaders = {};

if (localStorage.getItem('X-User-Token')) {
  App.httpHeaders['X-User-Token'] = localStorage.getItem('X-User-Token');
}

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
});

DS.RESTSerializer.reopen({
  normalizePayload: function(type, payload) {
    var newPayload = {};

    newPayload[type.typeKey] = payload;

    return newPayload;
  }
});