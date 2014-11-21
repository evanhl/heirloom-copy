App.Share = Ember.Model.extend({
  type: Ember.attr(),
  owner: Ember.belongsTo(App.Session, { key: 'owner', embedded: true }),
  created_at: Ember.attr(Date),
  photo: Ember.belongsTo('App.Photo', { key: 'photo', embedded: true }),
  photos: Ember.hasMany('App.Photo', { key: 'photos', embedded: true }),
  isPhotoSet: function () {
    return this.get('type') === 'photo_set';
  }.property('type'),
  isPhoto: function () {
    return this.get('type') === 'photo';
  }.property('type')
});

App.Share.url = 'share';
App.Share.adapter = App.APIAdapter.create({
  userNamespaced: false
});
