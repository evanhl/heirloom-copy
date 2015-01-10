App.SettingsController = Ember.Controller.extend({
  app: function () {
    return App;
  }.property(),

  userName: Ember.computed.alias('app.auth.currentSession.name'),
  userUsername: Ember.computed.alias('app.auth.currentSession.username'),
  userEmail: Ember.computed.alias('app.auth.currentSession.email'),

  actions: {
    close: function () {
      this.send('closeModal');
    }
  }
});