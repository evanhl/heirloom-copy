App.ToastableMixin = Ember.Mixin.create({
  listenToToast: function () {
    this.proxyToast = $.proxy(this.onToast, this);
    this.get('controller').on('toast', this.proxyToast);
  }.on('didInsertElement'),

  dontListenToToast: function () {
    this.get('controller').off('toast', this.proxyToast);
  }.on('willDestroyElement'),

  onToast: function (template, context) {
    var $span = $('<span></span>').text(Ember.I18n.t(template, context));

    $('<div class="toast"></div>')
      .append($span)
      .hide()
      .appendTo(this.$()).fadeIn(600).delay(2000).fadeOut(600, function () {
        $(this).remove();
      });
  }
});
