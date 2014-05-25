/* globals Dropzone, console */

var App = Ember.Application.create({});

// TODO: conditionally enable push state based on browser support
// App.Router.reopen({
//   location: 'history'
// });

App.Router.map(function() {
  this.resource('gallery');
  this.resource('albums');
  this.route('upload');
});

// TODO: clean up view on destroy
App.UploadView = Ember.View.extend({
  didInsertElement: function () {
    var upload = new App.Upload.UploadToS3();
  }
});

Dropzone.autoDiscover = false;