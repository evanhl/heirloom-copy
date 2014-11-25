//= require ./metaTagMixin
App.ShareView = Ember.View.extend(App.MetaTagMixin, App.HiddenNavMixin, {
  metaDescription: 'Fast, beautiful scanning for all the moments we love.',
  metaImages: function () {
    if (this.get('controller.photo')) {
      return [this.get('controller.photo.largeVersion')];
    } else if (this.get('controller.photos')) {
      return this.get('controller.photos').slice(0, 4).map(function (photo) {
        return photo.get('largeVersion');
      });
    }
  }.property('controller.photo', 'controller.photos.[]'),
  metaTitle: function () {
    var ownerName = this.get('controller.owner.name');

    if (this.get('controller.photo')) {
      return ownerName + ' ' + Ember.I18n.t('share.photoMessage');
    } else {
      return ownerName + ' ' + Ember.I18n.t('share.photosMessage', { count: this.get('controller.photos.length') });
    }
  }.property('controller.photo', 'controller.photos.[]', 'controller.owner'),
  metaTwitterCardType: 'photo',
  metaWaitUntil: ['metaImages'],
  photoContainerWidth: null,
  HIDE_NAV_WIDTH: 512,
  MAX_VISIBLE_PHOTOS: 6,

  shiftPhotos: function () {
    var photoWidth = Utils.getClassWidth('photo');
    var offset = this.get('controller.shiftRightIndex') * photoWidth;
    var $photoCont = this.$('.shared-photo');

    if (!$photoCont) { return; }

    this.$('.shared-photo').animate({ scrollLeft: offset }, 500);
  }.observes('controller.shiftRightIndex'),

  showTagline: function () {
    return this.get('isSmallScreen') || !this.get('controller.isLoggedIn');
  }.property('isSmallScreen', 'controller.isLoggedIn'),

  shouldHideNav: Ember.computed.alias('isSmallScreen'),
  isSmallScreen: function () {
    return this.get('viewportWidth') <= this.HIDE_NAV_WIDTH;
  }.property('viewportWidth'),

  setViewportWidth: function () {
    this.set('viewportWidth', $(window).width());
    this.setNumVisiblePhotos();
  },

  setNumVisiblePhotos: function () {
    var photoWidth = Utils.getClassWidth('photo');
    var ARROW_WIDTHS = 100;
    var numVis = Math.floor((this.get('viewportWidth') - ARROW_WIDTHS) / photoWidth);

    numVis = Math.min(numVis, this.MAX_VISIBLE_PHOTOS);
    this.set('controller.numVisiblePhotos', numVis);
    this.setPhotoContainerWidth(numVis, photoWidth);
  },

  setPhotoContainerWidth: function (numPhotos, photoWidth) {
    this.set('photoContainerWidth', numPhotos * photoWidth);
  },

  photoContainerStyle: function () {
    if (this.get('viewportWidth') <= this.HIDE_NAV_WIDTH) {
      return null;
    }

    if (this.get('photoContainerWidth')) {
      return 'max-width: ' + this.get('photoContainerWidth') + 'px';
    }
  }.property('photoContainerWidth', 'viewportWidth'),

  fixOverflow: function () {
    // Handles case when a viewport width change causes shiftRightIndex to be too high. For example, imagine
    // there are 10 photos and 4 visible with a shiftRightIndex of 6. The viewport expands and there are now 5 visible.
    // This implies 11 photo slots (5 + 6), but there are only 10 photos. So we reset the shiftRightIndex to 5.
    if (this.get('controller.numVisiblePhotos') + this.get('controller.shiftRightIndex') > this.get('controller.photos.length')) {
      this.set('controller.shiftRightIndex', Math.max(this.get('controller.photos.length') - this.get('controller.numVisiblePhotos'), 0));
    }
  }.observes('controller.numVisiblePhotos', 'controller.photos.length', 'controller.shiftRightIndex'),

  rightArrowEnabled: function () {
    return this.get('controller.shiftRightIndex') + this.get('controller.numVisiblePhotos') < this.get('controller.photos.length');
  }.property('controller.shiftRightIndex', 'controller.numVisiblePhotos', 'controller.photos.length'),

  leftArrowEnabled: function () {
    return this.get('controller.shiftRightIndex') > 0;
  }.property('controller.shiftRightIndex'),

  setupWidthListener: function () {
    this.setViewportWidth();
    this.proxiedSetViewportWidth = $.proxy(this.setViewportWidth, this);
    $(window).on('resize', this.proxiedSetViewportWidth);
  }.on('didInsertElement'),

  teardownWidthListener: function () {
    $(window).off('resize', this.proxiedSetViewportWidth);
  }.on('willDestroyElement')
});