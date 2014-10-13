//= require ../utils/infiniteScroll
App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: 'body',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement')
});