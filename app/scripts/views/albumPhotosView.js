//= require ../utils/infiniteScroll
App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  templateName: 'photos'
});
