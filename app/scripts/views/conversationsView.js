App.ConversationsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});