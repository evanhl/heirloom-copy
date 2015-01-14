//= require ../utils/infiniteScroll
//= require ./retractSelToolbarMixin
//= require ./toastableMixin

App.PhotosView = Ember.View.extend(InfiniteScroll.ViewMixin, App.AutoWidthMixin, App.RetractSelToolbarMixin, App.ToastableMixin, {
  scrollEl: 'body',
  containerSelector: '.photos-container',
  itemClass: 'photo',

  clearSelected: function () {
    this.get('controller').resetSelected();
  }.on('willDestroyElement'),

  addBodyGradient: function () {
    if (this.get('controller.isEmptyState') && this.get('controller.model.length') === 0) {
      $('body').addClass('photos-empty-bg');
    } else {
      $('body').removeClass('photos-empty-bg');
    }
  }.observes('controller.isEmptyState', 'controller.model.length'),

  removeBodyGradient: function () {
    $('body').removeClass('photos-empty-bg');
  }.on('willDestroyElement')
});
