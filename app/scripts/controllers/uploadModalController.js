App.UploadModalController = Ember.Controller.extend({
  actions: {
    close: function () {
      this.send('closeModal');
    },

    complete: function () {
      this.send('closeModal');
    }
  }
});
