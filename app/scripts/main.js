/* globals Dropzone, InfiniteScroll */

var App = Ember.Application.create({});

// Use HTML5 History API (pushState) to manage app URLs
App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('photos');
  this.resource('albums');
  this.route('upload');
});
