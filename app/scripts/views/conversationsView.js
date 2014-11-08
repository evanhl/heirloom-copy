//= require ../utils/infiniteScroll
App.ConversationsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  keyPress: function (e) {
    if (!$(e.target).hasClass('newConversationName')) { return; }

    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER) {
      controller.send('create');
    }
  },

  didInsertElement: function () {
    this.controller.on('enterCreateMode', this, this.scrollToTop);
  },

  willDestroyElement: function () {
    this.controller.off('enterCreateMode', this, this.scrollToTop);
  },

  scrollToTop: function () {
    this.$('.left-col-content').animate({
      scrollTop: 0
    });
  }
});