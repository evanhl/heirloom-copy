App.ConversationPhotosController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  needs: ['conversation'],
  conversation: Ember.computed.alias('controllers.conversation'),

  fetchPage: function (page, perPage) {
    var adapter = App.Album.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    var convo = this.get('conversation.model');

    if (!convo) {
      return;
    }

    var records = Ember.RecordArray.create({ modelClass: App.Photo, _query: params, container: false });

    return adapter.findNestedQuery(convo, App.Photo, 'photos', records, params);
  },

  conversationChanged: function () {
    this.clear();
    this.reset();
    this.send('getMore');
  }.on('init').observes('conversation.model')
});
