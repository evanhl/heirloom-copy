//= require ../utils/infiniteScroll
App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: 'body',
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});