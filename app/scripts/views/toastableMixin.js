App.ToastableMixin = Ember.Mixin.create({
  toastClasses: '',
  listenToToast: function () {
    this.get('controller').on('toast', this, this.onToast);
  }.on('didInsertElement'),

  dontListenToToast: function () {
    this.get('controller').off('toast', this, this.onToast);
  }.on('willDestroyElement'),

  onToast: function (template, context, toastClasses) {
    var $span = $('<span></span>').text(Ember.I18n.t(template, context));

    $('<div class="toast floater"></div>')
      .addClass(this.get('toastClasses'))
      .addClass(toastClasses || '')
      .append($span)
      .hide()
      .appendTo($('body')).fadeIn(600).delay(2000).fadeOut(600, function () {
        $(this).remove();
      });
  }
});
