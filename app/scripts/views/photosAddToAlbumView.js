App.PhotosAddToAlbumView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  setFocus: function() {
    // brings the view into focus in order to capture keyUps.
    this.$().attr({ tabindex: 1 }).focus();
  }.on('didInsertElement'),

  click: function (e) {
    if (!$(e.target).is('.lightbox')) {
      return;
    }

    this.get('controller').send('toCollection');
  },

  keyDown: function (e) {
    if (e.keyCode === Utils.Keys.ESC) {
      this.get('controller').send('toCollection');
    }
  },

  didInsertElement: function (){
    this.setupInfiniteScrollListener();
  },

  willDestroyElement: function (){
    this.teardownInfiniteScrollListener();
  }
});
