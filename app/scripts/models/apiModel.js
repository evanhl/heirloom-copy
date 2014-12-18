App.ApiModel = Ember.Model.extend({
  postNested: function (route, data) {
    var adapter = this.constructor.adapter;

    return adapter.postNested(this, data || {}, route);
  },

  findNestedQuery: function (nestedModelClass, route, data) {
    var adapter = this.constructor.adapter;
    var records = Ember.RecordArray.create({ modelClass: nestedModelClass, _query: data, container: false });

    return adapter.findNestedQuery(this, nestedModelClass, route, records, data || {});
  }
});
