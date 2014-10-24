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

  cleanup: function () {
    $('body').off('click.offShareMenu');
    this.set('controller.isCcMode', false);
  }.on('willDestroyElement'),

  bodyClick: function (e) {
    if(!$(e.target).closest(this.$('.settings-container')).length) {
      if (this.get('controller')) {
        this.set('controller.showSettingsMenu', false);
      }
    }
  },
});
