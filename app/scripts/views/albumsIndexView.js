//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
App.AlbumsIndexView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, {
  containerSelector: '.albums-container',
  itemClass: 'album',

  resetController: function () {
    this.controller.resetSelected();
  }.on('willDestroyElement')
});