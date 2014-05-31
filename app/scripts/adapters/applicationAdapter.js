// TODO: split into separate files

App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://api.hlstage.com',
  headers: {
    'X-User-Token': 'S57azk9UzxQSc3DN3mh4'
  }
});

App.PhotoSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    var newPayload = {};

    newPayload[type.typeKey] = payload;

    return newPayload;
  }
});

App.PhotoAdapter = App.ApplicationAdapter.extend({
  namespace: 'me',
  // FIXME: this is really hacky
  buildURL: function (type, id) {
    if (Ember.isNone(id)) {
      return this._super(type, id);
    } else {
      return this._super(type, id).replace('/me/', '/');
    }
  }
});

App.Photo = DS.Model.extend({
  source: DS.attr(),
  state: DS.attr(),
  versions: DS.attr(),

  versionForDimension: function (dim) {
    var versions = this.get('versions') || [];
    var thumb;

    thumb = versions.filter(function (version) {
      return parseInt(version.width) === dim || parseInt(version.height) === dim;
    });

    return thumb[0] && thumb[0].url;
  },

  thumbVersion: function () {
    return this.versionForDimension(420);
  }.property('versions'),

  largeVersion: function () {
    return this.versionForDimension(1280);
  }.property('versions')
});

