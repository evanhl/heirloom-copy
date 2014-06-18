// handles cases where sometimes a resource is at /me/[resource] and sometimes at /[resource]
App.UserNamespacedAdapterMixin = Ember.Mixin.create({
  namespace: 'me',
  // FIXME: /me/photos vs /photo/:id should be done in a clear way, without string replacement
  buildURL: function (type, id) {
    if (Ember.isNone(id)) {
      return this._super(type, id);
    } else {
      return this._super(type, id).replace('/me/', '/');
    }
  }
});


