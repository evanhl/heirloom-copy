//= require ../utils/infiniteScroll
App.AlbumsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});