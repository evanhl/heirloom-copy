App.RegistrationSerializer = DS.RESTSerializer.extend({
  serializeIntoHash: function(hash, type, record, options) {
    var serialized = this.serialize(record, options);

    Object.keys(serialized).forEach(function (key) {
      hash[key] = serialized[key];
    });
  },
});
