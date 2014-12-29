//= require basePhoto

App.Photo = App.BasePhoto.extend({
  thumbVersion: function () {
    return this.get('dataUri') || this.versionForDimension('xs') || this.get('mediumVersion');
  }.property('versions'),

  mediumVersion: function () {
    return this.versionForDimension('s');
  }.property('versions'),

  largeVersion: function () {
    return this.versionForDimension('n');
  }.property('versions'),

  fullVersion: function () {
    return this.versionForDimension('full');
  }.property('versions')
});

App.Photo.reopenClass({
  batchDelete: function (photoIds) {
    return this.adapter.batchDelete(this, photoIds, 'photo_ids');
  }
});

App.Photo.url = 'photos';
App.Photo.adapter = App.APIAdapter.create({
  userNamespaced: true
});
