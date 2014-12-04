//= require ../adapters/apiAdapter
//= require photo
//= require user

App.Session = App.User.extend({
  authentication_token: Ember.attr(),
  login: Ember.attr(),
  password: Ember.attr()
});

App.Session.reopenClass({
  createFromJson: function (json) {
    var sessionId;
    var sessionModel;

    sessionId = json.id || 'me';
    sessionModel = App.Session.create();
    sessionModel.load(sessionId, json);

    return sessionModel;
  }
});

App.Session.url = 'session';
App.Session.adapter = App.APIAdapter.create({
  userNamespaced: false,
  find: function(record, id) {
    var url = this.host + '/me',
        self = this;

    return this.ajax(url).then(function(data) {
      self.didFind(record, id, data);
      return record;
    });
  },
});

