//= require ../utils/transloadit
//= require ../utils/utils

App.ZipAssembly = Ember.Object.extend(Ember.Evented, {
  STATUS_INTERVAL: 750,
  MAX_STATUS_ERRORS: 4,
  urls: null,
  state: 'init',
  currentStage: 0,
  statusErrorCount: 0,
  didDownload: false,

  isDone: function () {
    return this.get('state') === 'done';
  }.property('state'),

  isError: function () {
    return this.get('state') === 'error';
  }.property('state'),

  init: function () {
    this._super();

    Utils.bindMethods(this, ['onInitSuccess', 'onInitError', 'checkStatus', 'parseStatus', 'handleStatusError']);

    Utils.Transloadit.createZip(this.get('urls'), this.onInitSuccess, this.onInitError);
    this.set('numStages', Utils.Transloadit.getNumStages());
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
    if (response && response.responseJSON && response.responseJSON.error) {
      this.handleError(response.responseJSON.error);
    } else {
      this.handleError();
    }
  },

  checkStatus: function () {
    var self = this;

    Utils.Transloadit.checkZipStatus(self.get('assemblyUrl'), this.parseStatus, this.handleStatusError);
  },

  handleStatusError: function () {
    this.set('statusErrorCount', this.get('statusErrorCount') + 1);

    if (this.get('statusErrorCount') >= this.MAX_STATUS_ERRORS) {
      this.handleError();
    }
  },

  parseStatus: function (response) {
    if (response.error) {
      this.handleError(response.error);
    } else if (response.ok === "ASSEMBLY_COMPLETED") {
      this.set('state', 'done');
      this.set('zipUrl', Utils.Transloadit.getZipUrl(response));
      this.set('currentStage', Utils.Transloadit.getStageNumber(response));
      this.clearHandle();
    } else if (response.ok === "ASSEMBLY_EXECUTING") {
      this.set('state', 'progressing');
      this.set('currentStage', Utils.Transloadit.getStageNumber(response));
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
  },

  cancel: function () {
    // TODO: abort the job on Transloadit
    this.clearHandle();
  }
});