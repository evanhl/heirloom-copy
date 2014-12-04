App.BasePhoto = Ember.Model.extend({
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
  }
});
