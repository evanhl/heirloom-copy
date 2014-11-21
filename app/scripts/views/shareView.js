//= require ./metaTagMixin
App.ShareView = Ember.View.extend(App.MetaTagMixin, App.HiddenNavMixin, {
  metaDescription: 'Fast, beautiful scanning for all the moments we love.',
  metaImage: Ember.computed.alias('controller.photo.largeVersion'),
  metaTitle: 'Heirloom | For all the moments we love',
  metaTwitterCardType: 'photo',
  metaWaitUntil: ['metaImage'],
  HIDE_NAV_WIDTH: 512,

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
  },

  setupWidthListener: function () {
    this.setViewportWidth();
    this.proxiedSetViewportWidth = $.proxy(this.setViewportWidth, this);
    $(window).on('resize', this.proxiedSetViewportWidth);
  }.on('didInsertElement'),

  teardownWidthListener: function () {
    $(window).off('resize', this.proxiedSetViewportWidth);
  }.on('willDestroyElement')
});