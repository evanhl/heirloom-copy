App.SettingsController = Ember.Controller.extend({
  actions: {
    close: function () {
      this.send('closeModal');
    }
  }
});