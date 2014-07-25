//= require ../utils/infiniteScroll
App.ConversationPostsView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: 'body',

  init: function () {
    this.resizeNavFiller = $.proxy(this.resizeNavFiller, this);
    this._super();
  },

  keyDown: function (e) {
    if (!$(e.target).hasClass('newPostMessage')) { return; }

    var controller = this.get('controller');

    if (e.keyCode === Utils.Keys.ENTER && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      controller.send('create');
    }
  },

  resizeNavFiller: function () {
    if (!this.$()) { return; }

    var self = this;

    Ember.run.next(function () {
      var $scrollEl = self.$scrollEl();
      var newPostHeight = self.$('.new-post').outerHeight();
      var navFillerHeight = self.$('.nav-filler').outerHeight();

      self.$('.nav-filler').css('height', newPostHeight);
    });
  }.observes('controller.newPostPhotos.length'),

  setupAutosizeTextarea: function () {
    var self = this;

    this.$('textarea').focus(function () {
      $(this).autosize({
        callback: function () {
          self.resizeNavFiller();
        }
      });
    });
  }.on('didInsertElement'),

  setupHeadroomForPost: function () {
    this.$('.new-post').headroom();
  }.on('didInsertElement'),

  destroyHeadroomForPost: function () {
    this.$('.new-post').headroom('destroy');
  }.on('willDestroyElement'),

  setupWindowListener: function () {
    $(window).on('resize', this.resizeNavFiller);
  }.on('didInsertElement'),

  destroyWindowListener: function () {
    $(window).off('resize', this.resizeNavFiller);
  }.on('willDestroyElement')
});
