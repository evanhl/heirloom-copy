App.PhotoGroupingView = Ember.View.extend({
  classNames: ['photo-grouping'],

  init: function () {
    this.resizeSectionBorder = $.proxy(this.resizeSectionBorder, this);
    this._super();
  },

  setupResizeHandler: function () {
    $(window).on('resize', this.resizeSectionBorder);
  }.on('didInsertElement'),

  tearDownResizeHandler: function () {
    $(window).off('resize', this.resizeSectionBorder);
  }.on('willDestroyElement'),

  resizeSectionBorder: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      // in some test scenarios, this.$('.photo-grouping') is undefined
      var $grouping = this.$();
      var $border = $grouping.find('.border');

      if (!$grouping || !$border) {
        return;
      }

      var $imgsCont = $grouping.find('.images-container');
      var contOffset = $imgsCont.offset().left;
      var outerRightEdge = $imgsCont.outerWidth() + contOffset;
      var imgs = $imgsCont.children('img');
      var rightMostImageRightEdge = 0;
      var rightMostImageOuterRightEdge = 0;

      for (var i = 0; i < imgs.size(); i++) {
        var img = $(imgs.get(i));
        rightMostImageRightEdge = img.offset().left + img.outerWidth();
        rightMostImageOuterRightEdge = img.offset().left + img.outerWidth(true);

        if (rightMostImageOuterRightEdge + img.outerWidth(true) > outerRightEdge) {
          break;
        }
      }

      $border.width(rightMostImageRightEdge - contOffset);
    });
  }.observes('controller.photos.length')
});
