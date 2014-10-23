//= require ../utils/infiniteScroll
//= require ./autoWidthMixin
//= require ./retractSelToolbarMixin
//= require ./toastableMixin

App.AlbumPhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, App.RetractChangeCoverToolbarMixin, App.ToastableMixin, {
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
