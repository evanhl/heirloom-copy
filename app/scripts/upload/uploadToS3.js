/* global Dropzone, Ember, console, App */
/* jslint bitwise: true */

// TODO: Follow proper Ember.js idioms
// TODO: Remove global functions
// TODO: Remove console.log & global exception

App.UploadToS3 = Ember.Object.extend({
  HOSTNAME: 'https://api.hlstage.com',
  UPLOAD_ENDPOINT: '/upload_signature',
  PHOTOS_ENDPOINT: '/photos',
  AUTH_TOKEN: 'S57azk9UzxQSc3DN3mh4',
  CONTENT_TYPE_EXTS: {
    'image/gif': '.gif',
    'image/jpeg': '.jpg',
    'image/pjpeg': '.jpg',
    'image/png': '.png'
  },

  init: function () {
    this.requestUploadSignature();
    this.initDropzone();
  },

  // TODO: centralize API call logic
  apiCall: function (url, type, data, success, error) {
    var self = this;
    var dataToSend = data;

    if (type === 'POST') {
      dataToSend = JSON.stringify(dataToSend);
    }

    $.ajax({
      url: this.HOSTNAME + url,
      type: type,
      dataType: 'json',
      data: dataToSend,
      contentType: 'application/json; charset=utf-8',
      success: success,
      error: error,
      beforeSend: function setHeader (xhr) {
        xhr.setRequestHeader('X-User-Token', self.AUTH_TOKEN);
      }
    });
  },

  requestUploadSignature: function () {
    var self = this;

    this.apiCall(this.UPLOAD_ENDPOINT, 'GET', {}, function (data) {
      self.setProperties(data);
    }, function () {
        // TODO: Handle failure to request upload signature
    });
  },

  // From http://stackoverflow.com/a/8809472
  // TODO: Move to separate utility .js file
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
    return this.get('key_starts_with') + this.generateUUID() + this.CONTENT_TYPE_EXTS[contentType];
  },

  initDropzone: function () {
    var dropzone;
    var self = this;

    dropzone = new Dropzone('.dropzone', {
      url: 'http://localhost:3000/upload',
      autoProcessQueue: true,
      acceptedFiles: 'image/gif,image/jpeg,image/pjpeg,image/png'
    });

    dropzone.on('processing', function () {
      // I can dynamically change my URL for each upload
      this.options.url = self.get('bucket_url');
    });

    dropzone.on('sending', function (file, xhr, formData) {
      var s3Fields = self.get('fields');
      var field;

      for (field in s3Fields) {
        formData.append(field, s3Fields[field]);
      }

      formData.append('Content-Type',           file.type);

      file.uploadedName = self.generateUploadName(file.type);

      formData.append('key',                    file.uploadedName);
    });

    dropzone.on('success', function (file) {
      self.apiCall(self.PHOTOS_ENDPOINT, 'POST', { key: file.uploadedName }, function (data) {

      }, function () {
          // TODO: Handle failure to register photo as uploaded
      });
    });
  }
});

