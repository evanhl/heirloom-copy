App.PostCommentsController = Ember.ArrayController.extend(InfiniteScroll.ControllerMixin, {
  post: Ember.computed.alias('parentController'),

  init: function () {
    // normally we would do this in the route, but in this case, there's no route.
    this.set('model', []);
    this.send('getMore');
  },

  fetchPage: function (page, perPage) {
    var adapter = App.Comment.adapter;
    var params = {
      page: page,
      per_page: perPage
    };
    // TODO: This is copypasta with AlbumPhotosController. We should be able to add a method
    // on the base model to handle this logic
    var records = Ember.RecordArray.create({ modelClass: App.Comment, _query: params, container: false });

    return adapter.findNestedQuery(this.get('post.model'), App.Comment, 'comments', records, params);
  },

  createComment: function () {
    var post = this.get('post.model');
    var message = this.get('newComment');
    var adapter = App.Comment.adapter;
    var self = this;
    var commentProps = {
      message: message
    };
    var comment = App.Comment.create(commentProps);

    // TODO: we shouldn't have to unwrap the post's ModelProxy here
    adapter.createNestedRecord(post, comment, 'comments').then(function () {
      self.unshiftObject(comment);
      self.set('newComment', null);
    }, function () {
      // TODO: handle failure
    });
  }
});
