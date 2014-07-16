App.PostCommentsView = Ember.View.extend({
  keyPress: function (e) {
    if (!$(e.target).hasClass('newComment')) { return; }

    var controller = this.get('controller');

    // FIXME: newComment shouldn't be stashed on the post
    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('createComment');
    }
  }
});
