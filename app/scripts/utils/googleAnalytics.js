/* globals ga */

Utils.GoogleAnalytics = {
  trackEvent: function (eventName, value) {
    if (!window.ga) { return; }

    var event = this.splitEventName(eventName);

    ga('send', 'event', event.category, event.action, event.label, value);
  },

  trackOutboundLink: function (url, newWindow) {
    if (!window.ga) { return; }

    ga('send', 'event', 'outbound', 'click', url, {
      hitCallback: function () {
        if (!newWindow) {
          document.location = url;
        }
      }
    });

    if (newWindow) {
      window.open(url);
    }
  },

  splitEventName: function (eventName) {
    var names = eventName.split('.');

    return {
      category: names[0],
      action: names[1],
      label: names[2]
    };
  }
};
