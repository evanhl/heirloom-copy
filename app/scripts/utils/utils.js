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

  if (type !== 'GET') {
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

Utils.getInitials = function (name) {
  name = name || '';

  var firstInitials = name.split(' ').map(function (split) {
    if (split && split[0])  {
      return split[0];
    } else {
      return '';
    }
  });

  return firstInitials[0] + (firstInitials[1] || '');
};

Utils.isAndroid = function () {
  return /Android/i.test(navigator.userAgent);
};

Utils.isIos = function () {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};

Utils.isProbablyAValidEmail = function (email) {
  return /.+@.+\..+/i.test(email);
};

Utils.getClassWidth = function (className) {
  var width;

  var $dummyPhoto = $('<div></div>').addClass(className).hide();
  width = $dummyPhoto.appendTo($('body')).outerWidth(true);
  $dummyPhoto.remove();

  return width;
};

// This has some caveats. See "Touch APIs" section here: http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
Utils.hasTouch = function () {
  return 'ontouchstart' in window;
};

Utils.IOS_STORE_LINK = 'https://itunes.apple.com/us/app/heirloom-for-all-moments-we/id931656673';
Utils.ANDROID_STORE_LINK = 'https://play.google.com/store/apps/details?id=io.heirloom.app';


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
  text = text || '';
  return new Ember.Handlebars.SafeString(text.split('\n').map(function (line) {
    return '<p>' + (line || '&nbsp;') + '</p>';
  }).join(''));
});

Ember.Handlebars.registerBoundHelper('prettyDay', function (date) {
  return moment(date).format('MMMM DD, YYYY');
});
