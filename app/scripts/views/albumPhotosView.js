//= require ../utils/infiniteScroll
App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement')
});
