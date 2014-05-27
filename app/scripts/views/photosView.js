/* globals App, Ember, InfiniteScroll */

// TODO: make spinner show/hide less jerky
App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});