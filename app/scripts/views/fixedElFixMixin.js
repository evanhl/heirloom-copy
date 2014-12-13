// The virtual keyboard in iOS safari screws up the scrollTop of any fixed element on input blur
// See here: http://stackoverflow.com/questions/7970389/ios-5-fixed-positioning-and-virtual-keyboard

App.FixedElFixMixin = Ember.Mixin.create({
  doIosFixedElFix: function () {
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.$('input,textarea').on('blur', function(){
        $(window).scrollTop(0);
      });
    });
  }.on('didInsertElement')
});
