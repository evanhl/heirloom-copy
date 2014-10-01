/* jslint bitwise: true */

// TODO: Follow proper Ember.js idioms

Utils.ensureNamespace('App.Upload');

App.Upload.UploadToS3 = Ember.Object.extend({
  ENDPOINT: '/me/photos',
  CONTENT_TYPE_EXTS: {
    'image/jpeg': '.jpg',
    'image/pjpeg': '.jpg',
    'image/png': '.png'
  },

  dropzoneEl: null,
  totalFiles: 0,
  successfulUploads: null,

  init: function () {
    var self = this;

    this.set('successfulUploads', []);

    if (!App.Upload.uploadSignature.get('fields')) {
      App.Upload.uploadSignature.addObserver('fields', this, 'initDropzone');
      App.Upload.uploadSignature.request();
    } else {
      this.initDropzone();
    }

    this._super();
  },

  // From http://stackoverflow.com/a/8809472
  generateUUID: function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  },

  generateUploadName: function (contentType) {
    return  App.Upload.uploadSignature.get('key_starts_with') + this.generateFilename(contentType);
  },

  generateFilename: function (contentType) {
    return this.generateUUID() + this.CONTENT_TYPE_EXTS[contentType];
  },

  initDropzone: function () {
    var dropzone;
    var $dropzoneEl = this.get('dropzoneEl');

    $dropzoneEl.dropzone({
      url: 'http://fake.url',
      autoProcessQueue: true,
      acceptedFiles: 'image/jpeg,image/pjpeg,image/png',
      previewTemplate: '<div class="photo dz-preview dz-file-preview"><img data-dz-thumbnail /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div></div>',
      thumbnailWidth: 372,
      thumbnailHeight: 372,
      addRemoveLinks: true,
      parallelUploads: 4,
      dictCancelUpload: "",
      dictRemoveFile: ""
    });
    dropzone = $dropzoneEl.get(0).dropzone;

    dropzone.on('processing', this.onProcessing);
    dropzone.on('sending', $.proxy(this.onSending, this));
    dropzone.on('success', $.proxy(this.onSuccess, this));
    dropzone.on('addedfile', $.proxy(this.onAddedFile, this));
    dropzone.on('removedfile', $.proxy(this.onRemovedFile, this));
  },

  onProcessing: function () {
    // I can dynamically change my URL for each upload
    this.options.url = App.Upload.uploadSignature.get('bucket_url');
  },

  onSending: function (file, xhr, formData) {
    var s3Fields = App.Upload.uploadSignature.get('fields');
    var field;

    for (field in s3Fields) {
      formData.append(field, s3Fields[field]);
    }

    file.uploadedName = this.generateUploadName(file.type);

    formData.append('Content-Type', file.type);
    formData.append('key', file.uploadedName);
  },

  onSuccess: function (file) {
    this.get('successfulUploads').pushObject(file);
  },

  onAddedFile: function () {
    this.set('totalFiles', this.get('totalFiles') + 1);
  },

  onRemovedFile: function (file) {
    this.set('totalFiles', this.get('totalFiles') - 1);
    this.get('successfulUploads').removeObject(file);
  },

  createPhotoRecords: function () {
    var self = this;
    this.get('successfulUploads').forEach(function (file) {
      Utils.apiCall(self.ENDPOINT, 'POST', { key: file.uploadedName }, function (data) {

      }, function () {
          // TODO: Handle failure to register photo as uploaded
      });
    });
  }
});

