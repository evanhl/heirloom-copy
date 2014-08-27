// TODO: clean up view on destroy
App.UploadModalView = Ember.View.extend({
  didInsertElement: function () {
    var upload = new App.Upload.UploadToS3();
  }
});

Dropzone.autoDiscover = false;