//= require ../utils/infiniteScroll

App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, {
  scrollEl: 'body',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement'),

  setAutoWidth: function () {
    Ember.run.schedule('afterRender', this, function () {
      this.setContainerWidth();
      this.proxiedSetContainerWidth = $.proxy(this.setContainerWidth, this);
      $(window).on('resize', this.proxiedSetContainerWidth);
    });
  }.on('didInsertElement'),

  unsetAutoWidth: function () {
    $(window).off('resize', this.proxiedSetContainerWidth);
  }.on('willDestroyElement'),

  setContainerWidth: function () {
    var $cont = this.$('.photos-container');
    var contWidth, blockWidth, maxImgPerRow;

    var $dummyPhoto = $('<div class="photo"></div>').hide();
    blockWidth = $dummyPhoto.appendTo($('body')).outerWidth(true);
    $dummyPhoto.remove();

    $cont.css('width', 'auto');
    contWidth = $cont.width();
    maxImgPerRow = Math.floor(contWidth / blockWidth);
    $cont.width(maxImgPerRow * blockWidth);
  }
});
