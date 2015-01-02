App.ZipDownloadModalController = Ember.ObjectController.extend({
  needs: ['photos'],
  // FIXME: Blerg. In Ember 1.9, we can use Route.render to send the model instead of using this hack.
  zipAssembly: Ember.computed.alias('controllers.photos.zipAssembly'),

  isZipping: function () {
    var state = this.get('zipAssembly.state');

    return (state === 'started' || state === 'progressing');
  }.property('zipAssembly.state'),

  isDone: Ember.computed.alias('zipAssembly.isDone'),

  progress: function () {
    return this.get('zipAssembly.currentStage') * 100.0 / this.get('zipAssembly.numStages');
  }.property('zipAssembly.currentStage', 'zipAssembly.numStages'),

  progressStyle: function () {
    return ['width: ', this.get('progress') || 0, '%;'].join('');
  }.property('progress'),

  downloadDisabled: function () {
    return !this.get('zipAssembly.isDone');
  }.property('zipAssembly.isDone'),

  actions: {
    close: function () {
      this.send('closeModal');
    }
  }
});