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
  ajax: function (url, params, method, settings) {
    // kick out session on any 401 response
    return this._super(url, params, method, settings).then(function (x) {
      return x;
    }, function (jqXHR) {
      if (jqXHR.status === 401) { // 401 = HTTP unauthorized
        App.set('auth.currentSession', null);
      }

      return jqXHR;
    });
  }
});

