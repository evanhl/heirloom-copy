/* globals App, DS */

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
  namespace: 'me'
});

App.Photo = DS.Model.extend({
  source: DS.attr()
});