App.Share = Ember.Model.extend({
  type: Ember.attr(),
  owner: Ember.belongsTo(App.Session, { key: 'owner', embedded: true }),
  created_at: Ember.attr(Date),
  photo: Ember.belongsTo(App.Photo, { key: 'photo', embedded: true })
});

App.Share.url = 'share';
App.Share.adapter = App.APIAdapter.create({
  userNamespaced: false
});
