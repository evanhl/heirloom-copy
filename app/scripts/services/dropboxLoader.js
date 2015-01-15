App.DropboxLoader = Ember.Object.extend(Ember.Evented, {
  TIMEOUT_MS: 10000,
  CHECK_INTERVAL: 100,

  init: function () {
    Utils.bindMethods(this, ['checkLoading']);
  },

  load: function () {
    if (window.Dropbox) {
      return true;
    }

    this.set('started', (new Date()).getTime());
    this.set('checkHandle', setInterval(this.checkLoading, this.CHECK_INTERVAL));

    $('<script/>').
      attr('type', 'text/javascript').
      attr('src', 'https://www.dropbox.com/static/api/2/dropins.js').
      attr('id', 'dropboxjs').
      attr('data-app-key', HLConfig.dropboxAppKey).
      appendTo('body');
  },

  checkLoading: function () {
    if (window.Dropbox) {
      this.trigger('loaded');
      this.clearHandle();
    }

    if ((new Date()).getTime() - this.get('started') > this.TIMEOUT_MS) {
      this.trigger('failed');
      this.clearHandle();
    }
  },

  clearHandle: function () {
    clearInterval(this.get('checkHandle'));
  }
});
