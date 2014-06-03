

App.ImageView = Ember.View.extend({
  tagName: 'img',
  attributeBindings:['src'],
  src: null,

  srcChanged: function () {
    this.set('controller.loadingImg', true);
  }.observes('src'),

  didInsertElement: function(){
    var self = this;

    this.$().on('load', function(evt){
      return self.imageLoaded(evt);
    }).on('error', function(evt){
      return self.imageError(evt);
    });
  },
  willDestroyElement: function () {
    this.$().off('load', 'error');
  },
  imageLoaded: function (e) {
    this.set('controller.loadingImg', false);
  },
  imageError: function (e) {
    this.set('controller.loadingImg', false);
  }
});