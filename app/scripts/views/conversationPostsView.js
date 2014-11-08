App.ConversationPostsView = Ember.View.extend({
  classNames: 'main-col-content',

  didInsertElement: function () {
    this.controller.on('didCreatePost', this, this.scrollToTop);
  },

  willDestroyElement: function () {
    this.controller.off('didCreatePost', this, this.scrollToTop);
  },

  scrollToTop: function () {
    this.$().animate({
      scrollTop: 0
    });
  }
});
