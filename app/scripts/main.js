/* globals Dropzone, InfiniteScroll */

var App = Ember.Application.create({});

// TODO: conditionally enable push state based on browser support
// App.Router.reopen({
//   location: 'history'
// });

App.Router.map(function() {
  this.resource('photos');
  this.resource('albums');
  this.route('upload');
});
