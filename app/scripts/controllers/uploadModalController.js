App.UploadModalController = Ember.Controller.extend(Ember.Evented, {
  totalFiles: Ember.computed.alias('uploadToS3.totalFiles'),
  successCount: Ember.computed.alias('uploadToS3.successfulUploads.length'),
  processingFiles: Ember.computed.alias('uploadToS3.processingFiles'),
  waiting: false,

  disableAdd: function () {
    var isProcessing = this.get('processingFiles') > 0;
    var atLeastOneSuccess = this.get('successCount') > 0;
    var waiting = this.get('waiting');
    var ready = !isProcessing && !waiting && atLeastOneSuccess;

    return !ready;
  }.property('processingFiles', 'successCount', 'waiting'),

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
      var self = this;

      this.set('waiting', true);
      this.get('uploadToS3').createPhotoRecords(function () {
        self.set('waiting', false);
        self.send('closeModal');
      });
    }
  }
});
