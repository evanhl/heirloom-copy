App.PostCommentsController = Ember.ArrayController.extend({
  init: function () {
    this.set('model', []);
  },

  post: Ember.computed.alias('parentController'),

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
    adapter.createNestedRecord(post.content, comment, 'comments').then(function () {
      self.unshiftObject(App.ModelProxy.create({
        content: comment
      }));
      self.set('newComment', null);
    }, function () {
      // TODO: handle failure
    });
  }
});
