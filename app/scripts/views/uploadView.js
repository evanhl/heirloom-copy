// TODO: clean up view on destroy
App.UploadView = Ember.View.extend({
  didInsertElement: function () {
    var upload = new App.Upload.UploadToS3();
  }
});

Dropzone.autoDiscover = false;