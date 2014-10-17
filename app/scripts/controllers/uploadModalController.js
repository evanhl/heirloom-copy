App.UploadModalController = Ember.Controller.extend(Ember.Evented, {
  totalFiles: Ember.computed.alias('uploadToS3.totalFiles'),
  successCount: Ember.computed.alias('uploadToS3.successfulUploads.length'),
  processingFiles: Ember.computed.alias('uploadToS3.processingFiles'),
  anyUnsaved: function () {
    return this.get('successCount') > 0 || this.get('processingFiles') > 0;
  }.property('successCount', 'processingFiles'),

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
    if ($dropzoneEl && $dropzoneEl.get(0) && $dropzoneEl.get(0).dropzone) {
      $dropzoneEl.get(0).dropzone.disable();
    }
  },

  actions: {
    close: function () {
      var noneUnsaved = !this.get('anyUnsaved');

      if (noneUnsaved || window.confirm(Em.I18n.t('upload.confirmClose'))) {
        this.send('closeModal');
      }
    },

    complete: function () {
      var self = this;

      this.set('waiting', true);
      this.get('uploadToS3').createPhotoRecords(function () {
        self.set('waiting', false);
        self.send('closeModal');
        self.trigger('didUpload', self.get('uploadToS3.successfulUploads').map(function (file) { return file.photoModel; }));
      });
    }
  }
});
