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
Utils.apiCall = function (url, type, data, success, error) {
  var self = this;
  var dataToSend = data;

  if (type === 'POST') {
    dataToSend = JSON.stringify(dataToSend);
  }

  $.ajax({
    url: HLConfig.HOSTNAME + url,
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
  var foundIndex = -1;

  arr.forEach(function (item, index) {
    if (filter(item)) {
      foundIndex = index;
    }
  });
  return foundIndex;
};

// Adapted from http://css-tricks.com/snippets/jquery/image-preloader/
Utils.preloadImage = function (imgUrl) {
  $("<img />").attr("src", imgUrl);
};


Utils.Keys = {
  ENTER: 13,
  ESC: 27,
  LEFT: 37,
  RIGHT: 39
};

// TODO: Should this be a "bound helper"?
Ember.Handlebars.registerHelper('ts', function (key) {
  return Em.I18n.t(key);
});

// TODO: Should this be a "bound helper"?
Ember.Handlebars.helper('multiline', function (text) {
  return new Ember.Handlebars.SafeString(text.split('\n').map(function (line) {
    return '<p>' + (line || '&nbsp;') + '</p>';
  }).join(''));
});

Ember.Handlebars.registerBoundHelper('fromNow', function (date) {
  return moment.min(moment(date), moment()).fromNow();
});
