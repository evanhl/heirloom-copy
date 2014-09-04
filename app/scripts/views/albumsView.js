//= require ../utils/infiniteScroll
App.AlbumsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  resetController: function () {
    this.controller.resetSelected();
  }.on('willDestroyElement')
});