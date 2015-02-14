App.ApiModel = Ember.Model.extend({
  postNested: function (route, data) {
    var adapter = this.constructor.adapter;

    return adapter.postNested(this, data || {}, route);
  },

  findNestedQuery: function (nestedModelClass, route, data) {
    var adapter = this.constructor.adapter;
    var records = Ember.RecordArray.create({ modelClass: nestedModelClass, _query: data, container: false });

    return adapter.findNestedQuery(this, nestedModelClass, route, records, data || {});
  },

  createNestedRecord: function (route, nestedModel) {
    var adapter = this.constructor.adapter;

    return adapter.createNestedRecord(this, nestedModel, route);
  },

  patch: function (data) {
    var adapter = this.constructor.adapter;

    if (!data) {
      data = this.getProperties(this.get('_dirtyAttributes'));
    }

    return adapter.patchRecord(this, data);
  },

  getBelongsTo: function(key, type, meta) {
    var get = Ember.get,
        idOrAttrs = get(this, '_data.' + key),
        record;

    if (Ember.isNone(idOrAttrs)) {
      return null;
    }

    if (meta.options.embedded) {
      var primaryKey = get(type, 'primaryKey'),
        id = idOrAttrs[primaryKey],
        cachedRecord = type.getCachedReferenceRecord(id);

      if (cachedRecord) {
        record = cachedRecord;
      } else {
        record = type.create({ isLoaded: false, id: id });
      }
      record.load(id, idOrAttrs);
    } else {
      record = type.find(idOrAttrs);
    }

    return record;
  }
});
