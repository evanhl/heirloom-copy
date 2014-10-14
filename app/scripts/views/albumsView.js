//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
App.AlbumsView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, {
  containerSelector: '.albums-container',
  itemClass: 'album',

  resetController: function () {
    this.controller.resetSelected();
  }.on('willDestroyElement')
});