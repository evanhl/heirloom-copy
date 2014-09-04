App.PhotoGroupingsView = Ember.View.extend({
  resetController: function () {
    this.controller.resetSelected();
  }.on('willDestroyElement')
});
