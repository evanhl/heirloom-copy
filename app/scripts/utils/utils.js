(function () {
  var ensureNamespace = function (namespace) {
    namespace.split('.').reduce(function (currentContext, context) {
      currentContext[context] = currentContext[context] || {};
      return currentContext[context];
    }, window);
  };

  ensureNamespace('Utils');
  Utils.ensureNamespace = ensureNamespace;
}());

// TODO: centralize API call logic
Utils.HOSTNAME = 'https://api.hlstage.com';
Utils.apiCall = function (url, type, data, success, error) {
  var self = this;
  var dataToSend = data;

  if (type === 'POST') {
    dataToSend = JSON.stringify(dataToSend);
  }

  $.ajax({
    url: this.HOSTNAME + url,
    type: type,
    dataType: 'json',
    data: dataToSend,
    contentType: 'application/json; charset=utf-8',
    success: success,
    error: error,
    beforeSend: function setHeader (xhr) {
      xhr.setRequestHeader('X-User-Token', App.get('auth.authToken'));
    }
  });
};

Utils.findIndexOf = function (arr, filter) {
  var i;
  for (i = 0; i < arr.length; i++) {
    if (filter(arr[i])) {
      return i;
    }
  }
  return -1;
};

Utils.Keys = {
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  RIGHT: 39
};

Ember.Handlebars.registerHelper('ts', function (key) {
  return Em.I18n.t(key);
});

Ember.Handlebars.helper('multiline', function (text) {
  return new Ember.Handlebars.SafeString(text.split('\n').map(function (line) {
    return '<p>' + (line || '&nbsp;') + '</p>';
  }).join(''));
});

