App.PhotoSerializer = DS.RESTSerializer.extend({
  normalizePayload: function(type, payload) {
    var newPayload = {};

    newPayload[type.typeKey] = payload;

    return newPayload;
  }
});