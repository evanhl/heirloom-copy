App.ApiModel = Ember.Model.extend({
  postNested: function (route, data) {
    var adapter = this.constructor.adapter;

    return adapter.postNested(this, data || {}, route);
  }
});
