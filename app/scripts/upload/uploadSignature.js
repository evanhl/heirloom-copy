Utils.ensureNamespace('App.Upload');

App.Upload.uploadSignature = Ember.Object.create({
  UPLOAD_ENDPOINT: '/upload_signature',
  request: function () {
    var self = this;

    Utils.apiCall(this.UPLOAD_ENDPOINT, 'GET', {}, function (data) {
      self.setProperties(data);
    }, function () {
        // TODO: Handle failure to request upload signature
    });
  }
});