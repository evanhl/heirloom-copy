App.PhotoPickerController = Ember.Controller.extend({
  actions: {
    close: function () {
      this.send('closeModal');
    }
  }
});