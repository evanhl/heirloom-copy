//= require ../utils/infiniteScroll
//= require ./retractSelToolbarMixin

App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, {
  scrollEl: 'body',
  containerSelector: '.photos-container',
  itemClass: 'photo',

  setupListeners: function () {
    this.proxyAddedPhotosToAlbum = $.proxy(this.onAddedPhotosToAlbum, this);
    this.get('controller').on('addedPhotosToAlbum', this.proxyAddedPhotosToAlbum);
    $('body').on('click.offShareMenu', $.proxy(this.bodyClick, this));
  }.on('didInsertElement'),

  bodyClick: function (e) {
    if(!$(e.target).closest(this.$('.share-container')).length) {
      this.set('controller.showShareMenu', false);
    }
  },

  clearSelected: function () {
    this.get('controller').resetSelected();
    $('body').off('click.offShareMenu');
  }.on('willDestroyElement'),

  cleanupListeners: function () {
    this.get('controller').off('addedPhotosToAlbum', this.proxyAddedPhotosToAlbum);
  }.on('willDestroyElement'),

  onAddedPhotosToAlbum: function (album, photosCount) {
    var $span = $('<span></span>').text(Ember.I18n.t('photos.addedToAlbum', {
      count: photosCount,
      albumName: album.get('name')
    }));

    $('<div class="toast"></div>')
      .append($span)
      .hide()
      .appendTo(this.$()).fadeIn(600).delay(2000).fadeOut(600, function () {
        $(this).remove();
      });
  }
});
