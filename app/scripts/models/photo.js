App.Photo = DS.Model.extend({
  source: DS.attr(),
  state: DS.attr(),
  versions: DS.attr(),

  versionForDimension: function (dim) {
    var versions = this.get('versions') || {};
    var thumb;

    return versions[dim] && versions[dim].url;
  },

  thumbVersion: function () {
    return this.versionForDimension('s');
  }.property('versions'),

  largeVersion: function () {
    return this.versionForDimension('n');
  }.property('versions')
});
