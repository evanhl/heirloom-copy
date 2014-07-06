//= require ../utils/infiniteScroll
App.ConversationsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  },

  keyPress: function (e) {
    if (!$(e.target).hasClass('newConversationName')) { return; }

    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('create');
    }
  }
});