//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
//= require ./retractSelToolbarMixin

App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, {
  containerSelector: '.album-photos-container',
  itemClass: 'photo',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement')
});
