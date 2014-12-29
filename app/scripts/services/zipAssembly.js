//= require ../utils/transloadit

App.ZipAssembly = Ember.Object.extend(Ember.Evented, {
  STATUS_INTERVAL: 2000,
  urls: null,


  init: function () {
    this._super();

    this.onInitSuccess = $.proxy(this.onInitSuccess, this);
    this.onInitError = $.proxy(this.onInitError, this);

    Utils.Transloadit.createZip(this.get('urls'), this.onInitSuccess, this.onInitError);
  },

  // TODO: set max wait time
  onInitSuccess: function (response) {
    var self = this;
    var intervalHandle;

    this.trigger('enqueued');

    this.set('assemblyUrl', response.assembly_ssl_url);

    intervalHandle = setInterval(function () {
      Utils.Transloadit.checkZipStatus(self.get('assemblyUrl'), function (response) {
        if (response.ok === "ASSEMBLY_COMPLETED") {
          /* globals console */
          console.log(response.results.zip[0].ssl_url);
          self.clearHandle();
        }
      });
    }, this.STATUS_INTERVAL);

    this.set('intervalHandle', intervalHandle);
  },

  onInitError: function () {

  },

  checkStatus: function () {

  },

  clearHandle: function () {
    clearInterval(this.get('intervalHandle'));
    this.set('intervalHandle', null);
  }
});