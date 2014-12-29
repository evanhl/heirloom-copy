App.ZipDownloadModalController = Ember.ObjectController.extend({
  needs: ['photos'],
  // FIXME: Blerg. In Ember 1.9, we can use Route.render to send the model instead of using this hack.
  zipAssembly: Ember.computed.alias('controllers.photos.zipAssembly'),

  downloadDisabled: function () {
    return !this.get('zipAssembly.isDone');
  }.property('zipAssembly.isDone'),

  actions: {
    close: function () {
      this.send('closeModal');
    }
  }
});