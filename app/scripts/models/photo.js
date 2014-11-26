App.Photo = Ember.Model.extend({
  id: Ember.attr(Number),
  description: Ember.attr(String),
  source: Ember.attr(),
  state: Ember.attr(),
  created_at: Ember.attr(Date),
  versions: Ember.attr(),
  policy: Ember.attr(),
  dataUri: null,

  isReady: function () {
    return this.get('state') === 'ready';
  }.property('state'),

  versionForDimension: function (dim) {
    var versions = this.get('versions') || {};
    var thumb;

    return versions[dim] && versions[dim].url;
  },

  thumbVersion: function () {
    return this.get('dataUri') || this.versionForDimension('xs') || this.get('mediumVersion');
  }.property('versions'),

  mediumVersion: function () {
    return this.versionForDimension('s');
  }.property('versions'),

  largeVersion: function () {
    return this.versionForDimension('n');
  }.property('versions')
});

App.Photo.url = 'photos';
App.Photo.adapter = App.APIAdapter.create({
  userNamespaced: true
});
