//= require user
//= require apiModel

App.Share = App.ApiModel.extend({
  type: Ember.attr(),
  owner: Ember.belongsTo(App.User, { key: 'owner', embedded: true }),
  created_at: Ember.attr(Date),
  photo: Ember.belongsTo('App.Photo', { key: 'photo', embedded: true }),
  photos: Ember.hasMany('App.Photo', { key: 'photos', embedded: true }),
  isPhotoSet: function () {
    return this.get('type') === 'photo_set';
  }.property('type'),
  isPhoto: function () {
    return this.get('type') === 'photo';
  }.property('type'),

  // gives a copy of the shared resource to the recipient
  add: function () {
    return this.postNested('add');
  }
});

App.Share.url = 'share';
App.Share.adapter = App.APIAdapter.create({
  userNamespaced: false
});
