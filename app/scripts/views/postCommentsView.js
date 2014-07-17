App.PostCommentsView = Ember.View.extend({
  keyPress: function (e) {
    if (!$(e.target).hasClass('newComment')) { return; }

    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('createComment');
    }
  }
});
