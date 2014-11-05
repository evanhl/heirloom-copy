//= require ../utils/infiniteScroll
App.ConversationsNewPostView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: 'body',

  init: function () {
    this.resizeNavFiller = $.proxy(this.resizeNavFiller, this);
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

  resizeNavFiller: function () {
    if (!this.$()) { return; }

    var self = this;

    Ember.run.next(function () {
      // var $scrollEl = self.$scrollEl();
      // // FIXME: this view shouldn't be reaching outside of its scope
      // var $navFiller = self.$().parent().parent().find('.nav-filler');
      // var newPostHeight = self.$('.new-post').outerHeight();
      // var navFillerHeight = $navFiller.outerHeight();

      // $navFiller.css('height', newPostHeight);
    });
  }.observes('controller.newPostPhotos.length'),

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
          self.resizeNavFiller();
        }
      });
    });
  }.on('didInsertElement'),

  setupWindowListener: function () {
    $(window).on('resize', this.resizeNavFiller);
  }.on('didInsertElement'),

  destroyWindowListener: function () {
    $(window).off('resize', this.resizeNavFiller);
  }.on('willDestroyElement')
});
