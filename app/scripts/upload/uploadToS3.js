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

  init: function () {
    if (!App.Upload.uploadSignature.get('fields')) {
      App.Upload.uploadSignature.addObserver('fields', this, 'initDropzone');
      App.Upload.uploadSignature.request();
    } else {
      this.initDropzone();
    }
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
    var self = this;

    // FIXME: don't use unqualified element selectors
    dropzone = new Dropzone('.dropzone', {
      url: 'http://fake.url',
      autoProcessQueue: true,
      acceptedFiles: 'image/jpeg,image/pjpeg,image/png'
    });

    dropzone.on('processing', function () {
      // I can dynamically change my URL for each upload
      this.options.url = App.Upload.uploadSignature.get('bucket_url');
    });

    dropzone.on('sending', function (file, xhr, formData) {
      var s3Fields = App.Upload.uploadSignature.get('fields');
      var field;

      for (field in s3Fields) {
        formData.append(field, s3Fields[field]);
      }

      file.uploadedName = self.generateUploadName(file.type);

      formData.append('Content-Type', file.type);
      formData.append('key', file.uploadedName);
    });

    dropzone.on('success', function (file) {
      Utils.apiCall(self.ENDPOINT, 'POST', { key: file.uploadedName }, function (data) {

      }, function () {
          // TODO: Handle failure to register photo as uploaded
      });
    });
  }
});

