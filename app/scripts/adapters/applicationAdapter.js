App.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://api.hlstage.com',
  ajaxError: function (jqXHR) {
    if (jqXHR.status === 401) { // 401 = HTTP unauthorized
      App.set('auth.currentSession', null);
    }
    return this._super(jqXHR);
  }
});
