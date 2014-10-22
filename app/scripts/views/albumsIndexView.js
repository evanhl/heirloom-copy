//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
//= require ./retractSelToolbarMixin
App.AlbumsIndexView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, {
  containerSelector: '.albums-container',
  itemClass: 'album',

  resetController: function () {
    this.controller.resetSelected();
  }.on('willDestroyElement')
});