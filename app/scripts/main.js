/* jshint -W079 */

var App = Ember.Application.create({});

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('photos');
  this.resource('photo', { path: 'photo/:photo_id' });
  this.resource('albums');
  this.route('upload');
});

