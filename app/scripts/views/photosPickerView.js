//= require ../utils/infiniteScroll
App.PhotosPickerView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: function () {
    return this.$().parent();
  }.property(),

  // TODO: consider moving didInsertElement and willDestroyElement into ViewMixin
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});
