//= require ../utils/transloadit
//= require ../utils/utils

App.ZipAssembly = Ember.Object.extend(Ember.Evented, {
  STATUS_INTERVAL: 1000,
  urls: null,
  state: 'init',

  isDone: function () {
    return this.get('state') === 'done';
  }.property('state'),

  init: function () {
    this._super();

    Utils.bindMethods(this, ['onInitSuccess', 'onInitError', 'checkStatus', 'parseStatus']);

    Utils.Transloadit.createZip(this.get('urls'), this.onInitSuccess, this.onInitError);
  },

  // TODO: set max wait time
  onInitSuccess: function (response) {
    var intervalHandle;

    this.set('state', 'started');

    this.set('assemblyUrl', response.assembly_ssl_url);

    intervalHandle = setInterval(this.checkStatus, this.STATUS_INTERVAL);

    this.set('intervalHandle', intervalHandle);
  },

  onInitError: function (response) {
    if (response && response.error) {
      this.handleError(response.error);
    } else {
      this.handleError();
    }
  },

  checkStatus: function () {
    var self = this;

    Utils.Transloadit.checkZipStatus(self.get('assemblyUrl'), this.parseStatus);
  },

  parseStatus: function (response) {
    if (response.error) {
      this.handleError(response.error);
    } else if (response.ok === "ASSEMBLY_COMPLETED") {
      this.set('state', 'done');
      this.set('zipUrl', response.results.zip[0].ssl_url);
      this.clearHandle();
    } else if (response.ok === "ASSEMBLY_EXECUTING") {
      this.set('state', 'progressing');
    }
  },

  handleError: function (error) {
    this.set('error', error);
    this.set('state', 'error');
    this.clearHandle();
  },

  clearHandle: function () {
    clearInterval(this.get('intervalHandle'));
    this.set('intervalHandle', null);
  }
});