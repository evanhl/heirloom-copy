App.PhotoPickerView = Ember.View.extend({
  clearSelected: function () {
    this.get('controller').clearSelected();
  }.on('willDestroyElement')
});
