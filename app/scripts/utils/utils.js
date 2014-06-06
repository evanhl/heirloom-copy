/* global Utils */

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
Utils.AUTH_TOKEN = 'UNoPHd8x2Wzw8zdY4aMi';
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
      xhr.setRequestHeader('X-User-Token', self.AUTH_TOKEN);
    }
  });
};