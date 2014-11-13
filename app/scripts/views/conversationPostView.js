App.ConversationPostView = Ember.View.extend({
  templateName: 'conversationPost',
  tagName: 'div',
  classNames: ['post'],

  setCalcPhotosPerRow: function () {
    Ember.run.schedule('afterRender', this, function () {
      this.calcPhotosPerRow();
      this.proxiedCalcPhotosPerRow = $.proxy(this.calcPhotosPerRow, this);
      $(window).on('resize', this.proxiedCalcPhotosPerRow);
    });
  }.on('didInsertElement'),

  unsetCalcPhotosPerRow: function () {
    $(window).off('resize', this.proxiedCalcPhotosPerRow);
  }.on('willDestroyElement'),

  calcPhotosPerRow: function () {
    var contWidth = this.$('.post-photos').width();

    this.set('controller.maxPerRow', Math.floor(contWidth / Utils.getClassWidth('post-photo')));
  }
});
