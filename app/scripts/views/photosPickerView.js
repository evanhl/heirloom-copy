//= require ../utils/infiniteScroll
App.PhotosPickerView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: function () {
    return this.$().parent();
  }.property(),

  clearSelected: function () {
    this.get('controller').clearSelected();
  }.on('willDestroyElement')
});
