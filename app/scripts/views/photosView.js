//= require ../utils/infiniteScroll

App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, {
  scrollEl: 'body',
  containerSelector: '.photos-container',
  itemClass: 'photo',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement')
});
