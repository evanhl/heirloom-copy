App.APIAdapter = Ember.RESTAdapter.extend({
  host: 'https://api.hlstage.com',

  buildURL: function(klass, id) {
    var urlParts = [];
    var urlRoot = Ember.get(klass, 'url');
    if (!urlRoot) { throw new Error('Ember.RESTAdapter requires a `url` property to be specified'); }

    urlParts.push(this.host);

    if (this.get('userNamespaced') && Ember.isEmpty(id)) {
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


  postNested: function(parent, params, nestedUrl) {
    // TODO: use hasMany to obtain nestedUrl instead of passing in
    var primaryKey = Ember.get(parent.constructor, 'primaryKey'),
        url = this.buildURL(parent.constructor, Ember.get(parent, primaryKey)) + '/' + nestedUrl;

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

