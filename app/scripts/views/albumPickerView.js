App.AlbumPickerView = Ember.View.extend({
  fetchFirstPage: function () {
    this.controller.fetchFirstPage();
  }.on('didInsertElement')
});
