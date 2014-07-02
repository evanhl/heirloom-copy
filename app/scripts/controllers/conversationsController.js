App.ConversationsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  fetchPage: function (page, perPage) {
    var self = this;

    return App.Conversation.fetchQuery({
      page: page,
      per_page: perPage
    });
  }
});