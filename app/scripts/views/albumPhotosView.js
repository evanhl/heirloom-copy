//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, {
  containerSelector: '.album-photos-container',
  itemClass: 'photo',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement')
});
