//= require ../utils/infiniteScroll
App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  templateName: 'photos',

  clearSelected: function () {
    this.get('controller').clearSelected();
  }.on('willDestroyElement')
});
