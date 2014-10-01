App.UploadModalController = Ember.Controller.extend({
  totalFiles: Ember.computed.alias('uploadToS3.totalFiles'),
  successCount: Ember.computed.alias('uploadToS3.successfulUploads.length'),
  noneSuccessful: function () {
    return this.get('successCount') === 0;
  }.property('successCount'),

  initDropzone: function ($dropzoneEl) {
    var upload = App.Upload.UploadToS3.create({ dropzoneEl: $dropzoneEl });
    this.set('uploadToS3', upload);
  },

  destroyDropzone: function ($dropzoneEl) {
    $dropzoneEl.get(0).dropzone.disable();
  },

  actions: {
    close: function () {
      this.send('closeModal');
    },

    complete: function () {
      this.get('uploadToS3').createPhotoRecords();
      this.send('closeModal');
    }
  }
});
