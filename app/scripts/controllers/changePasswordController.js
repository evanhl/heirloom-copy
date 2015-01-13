App.ChangePasswordController = Ember.Controller.extend({
  actions: {
    close: function () {
      this.send('openModal', 'settings');
    }
  }
});
