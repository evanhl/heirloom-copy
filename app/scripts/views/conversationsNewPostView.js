//= require ../utils/infiniteScroll
App.ConversationsNewPostView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: 'body',

  init: function () {
    this.resizeFiller = $.proxy(this.resizeFiller, this);
    this._super();
  },

  keyDown: function (e) {
    if (!$(e.target).hasClass('newPostMessage')) { return; }

    var controller = this.get('controller');

    if (controller.get('postDisabled')) {
      return;
    }

    if (e.keyCode === Utils.Keys.ENTER && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      controller.send('create');
    }
  },

  manualAutosize: function () {
    // manually trigger an autosize of the text area. since we cleared the textarea via JS,
    // autosize doesn't have a typing event to go off of

    Ember.run.next(this, function () {
      if (this.$('textarea')) {
        this.$('textarea').trigger('autosize.resize');
      }
    });
  },

  resizeFiller: function () {
    if (!this.$()) { return; }

    Ember.run.next(this, function () {
      var $filler = $('.new-post-filler');
      var $post = $('.new-post');

      $filler.css('height', $post.outerHeight());
    });
  }.on('didInsertElement').observes('controller.newPostPhotos.length', 'controller.newPostAlbum'),

  hasPhotosOrAlbums: function () {
    return this.get('controller.newPostPhotos.length') || this.get('controller.newPostAlbum');
  }.property('controller.newPostPhotos.[]', 'controller.newPostAlbum'),

  setupControllerListener: function () {
    this.get('controller').on('clearNewPost', this, this.manualAutosize);
  }.on('didInsertElement'),

  clearControllerListener: function () {
    this.get('controller').off('clearNewPost', this, this.manualAutosize);
  }.on('willDestroyElement'),

  setupAutosizeTextarea: function () {
    var self = this;

    this.$('textarea').focus(function () {
      $(this).autosize({
        callback: function () {
          self.resizeFiller();
        }
      });
    });
  }.on('didInsertElement'),

  setupWindowListener: function () {
    $(window).on('resize', this.resizeFiller);
  }.on('didInsertElement'),

  destroyWindowListener: function () {
    $(window).off('resize', this.resizeFiller);
  }.on('willDestroyElement')
});
