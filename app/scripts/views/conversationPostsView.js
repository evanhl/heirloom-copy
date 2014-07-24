//= require ../utils/infiniteScroll
App.ConversationPostsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  keyDown: function (e) {
    if (!$(e.target).hasClass('newPostMessage')) { return; }

    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      controller.send('create');
    }
  },

  setupAutosizeTextarea: function () {
    this.$('textarea').focus(function () {
      $(this).autosize();
    });
  }.on('didInsertElement'),

  setupHeadroomForPost: function () {
    this.$('.new-post').headroom();
  }.on('didInsertElement'),

  destroyHeadroomForPost: function () {
    this.$('.new-post').headroom('destroy');
  }.on('willDestroyElement')
});
