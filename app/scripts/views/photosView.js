//= require ../utils/infiniteScroll
//= require ./retractSelToolbarMixin
//= require ./toastableMixin

App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, App.ToastableMixin, {
  scrollEl: 'body',
  containerSelector: '.photos-container',
  itemClass: 'photo',

  setupListeners: function () {
    $('body').on('click.offShareMenu', $.proxy(this.bodyClick, this));
  }.on('didInsertElement'),

  bodyClick: function (e) {
    if(!$(e.target).closest(this.$('.share-container')).length) {
      if (this.get('controller')) {
        this.set('controller.showShareMenu', false);
      }
    }
  },

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement'),

  cleanupListeners: function () {
    $('body').off('click.offShareMenu');
  }.on('willDestroyElement')
});
