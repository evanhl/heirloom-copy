App.ConversationPostsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  keyPress: function (e) {
    if (!$(e.target).hasClass('newPostMessage')) { return; }

    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('create');
    }
  }
});
