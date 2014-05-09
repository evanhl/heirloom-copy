(function () {
  var $h = $('.hero-unit ul');

  if ($ && $.fn && $.fn.jquery) {
    $h.append($('<li/>').html('jQuery'));
  }

  if (Ember && Ember.VERSION) {
    $h.append($('<li/>').html('Ember'));
  }  

  if (Handlebars && Handlebars.VERSION) {
    $h.append($('<li/>').html('Handlebars'));
  }    
})();