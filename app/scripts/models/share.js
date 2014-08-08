App.Share = Ember.Model.extend({
  type: Ember.attr(),
  photo: Ember.belongsTo(App.Photo, { key: 'photo', embedded: true })
});

App.Share.url = 'share';
App.Share.adapter = App.APIAdapter.create({
  userNamespaced: false
});
