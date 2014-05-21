/* global Dropzone, console */
/* jslint bitwise: true */

// TODO: Follow proper Ember.js idioms
// TODO: Remove global functions

// TODO: replace with API call
var S3_DATA = {
  "fields": {
    "AWSAccessKeyId": "AKIAI36DQB4UNAJPB3DA",
    "acl": "private",
    "policy": "eyJleHBpcmF0aW9uIjoiMjAxNC0wNS0yMlQyMjoxNDoxN1oiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJoZWlybG9vbS1zdGFnaW5nLXVwbG9hZHMifSx7ImFjbCI6InByaXZhdGUifSx7InN1Y2Nlc3NfYWN0aW9uX3N0YXR1cyI6IjIwMSJ9LFsic3RhcnRzLXdpdGgiLCIkdXRmOCIsIiJdLFsic3RhcnRzLXdpdGgiLCIka2V5IiwidXBsb2Fkcy8zLyJdLFsic3RhcnRzLXdpdGgiLCIkeC1yZXF1ZXN0ZWQtd2l0aCIsIiJdLFsic3RhcnRzLXdpdGgiLCIkY29udGVudC10eXBlIiwiIl0sWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCw1MzY4NzA5MTIwMF1dfQ==",
    "signature": "f9aJXSn+wyAxa/QLIPRQpX5Yh6c=",
    "success_action_status": "201",
    "utf8": true,
    "X-Requested-With": "xhr"
  },
  "key_starts_with": "uploads/3/",
  "bucket_url": "https://heirloom-staging-uploads.s3.amazonaws.com/"
};

var CONTENT_TYPE_EXTS = {
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/pjpeg': '.jpg',
  'image/png': '.png'
};

// From http://stackoverflow.com/a/8809472
// TODO: Move to separate .js file
var generateUUID = function () {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
  });
  return uuid;
};

var generateUploadName = function (contentType) {
  return generateUUID() + CONTENT_TYPE_EXTS[contentType];
};

// init Dropzone.js
// TODO: Move me to a .js file
(function () {
  var i = 0;
  var myDropzone;

  Dropzone.autoDiscover = false;

  myDropzone = new Dropzone('.dropzone', {
    url: 'http://localhost:3000/upload',
    autoProcessQueue: true,
    acceptedFiles: 'image/gif,image/jpeg,image/pjpeg,image/png'
  });

  myDropzone.on('processing', function () {
    // I can dynamically change my URL for each upload
    this.options.url = S3_DATA.bucket_url;
  });

  myDropzone.on('sending', function (file, xhr, formData) {
    formData.append('AWSAccessKeyId',         S3_DATA.fields.AWSAccessKeyId);
    formData.append('acl',                    S3_DATA.fields.acl);
    formData.append('policy',                 S3_DATA.fields.policy);
    formData.append('signature',              S3_DATA.fields.signature);
    formData.append('success_action_status',  S3_DATA.fields.success_action_status);
    formData.append('utf8',                   S3_DATA.fields.utf8);
    formData.append('X-Requested-With',       S3_DATA.fields['X-Requested-With']);
    formData.append('Content-Type',           file.type);

    file.uploadedName = S3_DATA.key_starts_with + generateUploadName(file.type);
    formData.append('key',                    file.uploadedName);
  });

  // TODO: replace with request to create image record
  myDropzone.on('success', function (file) {
    console.log(file.uploadedName);
  });
}());
