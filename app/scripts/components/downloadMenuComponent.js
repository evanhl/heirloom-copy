App.DownloadMenuComponent = Ember.Component.extend(App.RegisterableMixin, {
  close: function () {
    if (this.get('bubbleMenu')) {
      this.get('bubbleMenu').close();
    }
  },

  toggle: function () {
    if (this.get('bubbleMenu')) {
      this.get('bubbleMenu').toggle();
    }
  },

  actions: {
    zipDownload: function () {
      this.sendAction('zipDownload');
      this.close();
    }
  }
});
