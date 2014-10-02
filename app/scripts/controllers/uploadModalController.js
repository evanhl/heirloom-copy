App.UploadModalController = Ember.Controller.extend(Ember.Evented, {
  totalFiles: Ember.computed.alias('uploadToS3.totalFiles'),
  successCount: Ember.computed.alias('uploadToS3.successfulUploads.length'),
  processingFiles: Ember.computed.alias('uploadToS3.processingFiles'),

  readyToAdd: function () {
    var notReady = this.get('processingFiles') === 0 && this.get('successCount') > 0;
    return !notReady;
  }.property('processingFiles', 'successCount'),

  initDropzone: function ($dropzoneEl) {
    var upload = App.Upload.UploadToS3.create({ dropzoneEl: $dropzoneEl });
    this.set('uploadToS3', upload);
    upload.on('fileAdded', $.proxy(this.addFakePhoto, this));
  },

  addFakePhoto: function () {
    this.trigger('addFakePhoto');
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
