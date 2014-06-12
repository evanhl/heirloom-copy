App.SignedInRouteMixin = Ember.Mixin.create({
  beforeModel: function () {
    if (!App.get('auth.isLoggedIn')) {
      // TODO: continue to requested route after successful sign in
      this.transitionTo('signin');
    }
  }
});
