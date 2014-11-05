//= require albumPickerController

App.GroupAlbumPickerController = App.AlbumPickerController.extend({
  title: function () {
    return 'Add Moments to Group';
  }.property(),

  canCreateAlbum: function () {
    return false;
  }.property()
});