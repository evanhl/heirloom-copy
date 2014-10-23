//= require ../utils/utils
App.APIAdapter = Ember.RESTAdapter.extend({
  host: HLConfig.HOSTNAME,

  buildURL: function(klass, id, userNamespacedOverride) {
    var urlParts = [];
    var urlRoot = Ember.get(klass, 'url');
    var userNamespaced = (typeof userNamespacedOverride === 'undefined') ? this.get('userNamespaced')  : userNamespacedOverride;
    if (!urlRoot) { throw new Error('Ember.RESTAdapter requires a `url` property to be specified'); }

    urlParts.push(this.host);

    if (userNamespaced && Ember.isEmpty(id)) {
      urlParts.push('me');
    }

    urlParts.push(urlRoot);

    if (!Ember.isEmpty(id)) {
      urlParts.push(id);
    }

    return urlParts.join('/');
  },

  findNestedQuery: function(parent, childClass, nestedUrl, records, params) {
    // TODO: use hasMany to obtain nestedUrl instead of passing in
    var klass = parent.constructor,
        url = this.buildURL(klass, parent.get('id')) + '/' + nestedUrl,
        self = this;

    return this.ajax(url, params).then(function (data) {
      self.didFindQuery(childClass, records, params, data);
      return records;
    });
  },

  removeNestedRecord: function(parent, record, nestedUrl) {
    // TODO: use hasMany to obtain nestedUrl instead of passing in
    var primaryKey = Ember.get(parent.constructor, 'primaryKey'),
        url = this.buildURL(parent.constructor, Ember.get(parent, primaryKey)) + '/' + nestedUrl + '/' + record.get('id');

    return this.ajax(url, {}, 'DELETE');
  },

  saveNestedRecord: function(parent, record, nestedUrl) {
    var primaryKey = Ember.get(parent.constructor, 'primaryKey'),
        url = this.buildURL(parent.constructor, parent.get('id')) + '/' + nestedUrl,
        self = this;

    return this.ajax(url, record.toJSON(), "POST").then(function(data) {
      self.didSaveRecord(record, data);
      return record;
    });
  },

  patchRecord: function(record, data) {
    var primaryKey = Ember.get(record.constructor, 'primaryKey'),
        url = this.buildURL(record.constructor, record.get('id')),
        self = this;

    return this.ajax(url, data, "PATCH").then(function(data) {
      self.didSaveRecord(record, data);
      return record;
    });
  },

  createNestedRecord: function(parent, record, nestedUrl) {
    var primaryKey = Ember.get(parent.constructor, 'primaryKey'),
        url = this.buildURL(parent.constructor, parent.get('id')) + '/' + nestedUrl,
        self = this;

    return this.ajax(url, record.toJSON(), "POST").then(function(data) {
      self.didCreateRecord(record, data);
      return record;
    });
  },

  postNested: function(parent, params, nestedUrl) {
    // TODO: use hasMany to obtain nestedUrl instead of passing in
    var primaryKey = Ember.get(parent.constructor, 'primaryKey'),
        url = this.buildURL(parent.constructor, Ember.get(parent, primaryKey)) + '/' + nestedUrl;

    return this.ajax(url, params, 'POST');
  },

  batchDelete: function (klass, ids, key) {
    var params = {};
    var url = this.buildURL(klass, null, false) + '/' + 'delete';

    params[key] = ids;

    return this.ajax(url, params, 'POST');
  },

  ajax: function (url, params, method, settings) {
    // kick out session on any 401 response
    return this._super(url, params, method, settings).then(function (x) {
      return x;
    }, function (jqXHR) {
      if (jqXHR.status === 401) { // 401 = HTTP unauthorized
        App.set('auth.currentSession', null);
      }

      throw jqXHR;
    });
  }
});

