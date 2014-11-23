//= require ./metaTagMixin
App.ShareView = Ember.View.extend(App.MetaTagMixin, App.HiddenNavMixin, {
  metaDescription: 'Fast, beautiful scanning for all the moments we love.',
  metaImage: Ember.computed.alias('controller.photo.largeVersion'),
  metaTitle: 'Heirloom | For all the moments we love',
  metaTwitterCardType: 'photo',
  metaWaitUntil: ['metaImage'],
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

  setupWidthListener: function () {
    this.setViewportWidth();
    this.proxiedSetViewportWidth = $.proxy(this.setViewportWidth, this);
    $(window).on('resize', this.proxiedSetViewportWidth);
  }.on('didInsertElement'),

  teardownWidthListener: function () {
    $(window).off('resize', this.proxiedSetViewportWidth);
  }.on('willDestroyElement')
});