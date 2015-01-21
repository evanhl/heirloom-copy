//= require apiModel
//= require fuzzyDate

App.BasePhoto = App.ApiModel.extend({
  id: Ember.attr(Number),
  source: Ember.attr(),
  state: Ember.attr(),
  created_at: Ember.attr(Date),
  versions: Ember.attr(),
  policy: Ember.attr(),
  owner: Ember.belongsTo('App.User', { key: 'owner', embedded: true }),
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
