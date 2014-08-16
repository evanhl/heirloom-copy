App.PhotoGroupingsView = Ember.View.extend({
  setupResizeHandler: function () {
    $(window).on('resize', this.resizeSectionBorder);
  }.on('didInsertElement'),

  tearDownResizeHandler: function () {
    $(window).off('resize', this.resizeSectionBorder);
  }.on('willDestroyElement'),

  resizeSectionBorder: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('.photo-grouping') && this.$('.photo-grouping').each(function (index, el) {
        var $grouping = $(el);
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

        $grouping.find('.border').width(rightMostImageRightEdge - contOffset);
      });
    });
  }.observes('controller.content.length')
});
