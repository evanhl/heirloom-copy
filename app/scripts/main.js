/* globals Dropzone, console */

var App = Ember.Application.create({});

App.Router.map(function() {
  this.resource('gallery');
  this.resource('albums');
  this.route('upload');
});

// FIXME: Don't re-init Dropzone on every render
// FIXME: Separate render and S3 setup log
App.UploadView = Ember.View.extend({
  didInsertElement: function () {
    var upload = new App.UploadToS3();
  }
});

Dropzone.autoDiscover = false;