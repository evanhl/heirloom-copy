// App.PhotoGroupingView = Ember.View.extend({
//   classNames: ['photo-grouping'],

//   init: function () {
//     this.resizeSectionBorder = $.proxy(this.resizeSectionBorder, this);
//     this._super();
//   },

//   setupResizeHandler: function () {
//     $(window).on('resize', this.resizeSectionBorder);
//   }.on('didInsertElement'),

//   tearDownResizeHandler: function () {
//     $(window).off('resize', this.resizeSectionBorder);
//   }.on('willDestroyElement'),

//   resizeSectionBorder: function () {
//     Ember.run.scheduleOnce('afterRender', this, function () {
//       // in some test scenarios, this.$('.photo-grouping') is undefined
//       var $grouping = this.$();
//       var $border = $grouping.find('.border');
//       var $examplePhoto = $('<div/>').addClass('photo').hide().appendTo('body');
//       var photoWidth = $examplePhoto.outerWidth(true);
//       var rightMargin = parseInt($examplePhoto.css('margin-right'), 10);

//       var numPhotos = this.get('controller.photos.length');
//       var containerWidth = $grouping.width();
//       var photosPerLine = Math.min(numPhotos, Math.floor(containerWidth / photoWidth));

//       $border.width((photosPerLine * photoWidth) - rightMargin);
//     });
//   }.observes('controller.photos.length')
// });
