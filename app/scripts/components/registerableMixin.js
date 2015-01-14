App.RegisterableMixin = Ember.Mixin.create({
  register: function () {
    this.set('registerAs', this);
  }.on('init')
});