//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
//= require ./retractSelToolbarMixin

App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, {
  containerSelector: '.album-photos-container',
  itemClass: 'photo',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement'),

  setupListeners: function () {
    $('body').on('click.offShareMenu', $.proxy(this.bodyClick, this));
  }.on('didInsertElement'),

  cleanupListeners: function () {
    $('body').off('click.offShareMenu');
  }.on('willDestroyElement'),

  bodyClick: function (e) {
    if(!$(e.target).closest(this.$('.settings-container')).length) {
      this.set('controller.showSettingsMenu', false);
    }
  },
});
