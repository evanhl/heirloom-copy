App.ZipDownloadModalView = Ember.View.extend({
  click: function (e) {
    if ($(e.target).closest('.take-action').size()) {
      this.set('controller.zipAssembly.didDownload', true);
      this.$('iframe.zip-dl').attr('src', this.get('controller.zipAssembly.zipUrl'));
    }
  }
});
