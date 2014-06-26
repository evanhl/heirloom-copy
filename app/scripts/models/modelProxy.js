(function () {

  var genProxyMethods = function (methods) {
    return methods.reduce(function (object, method) {
      object[method] = function () {
        return this.content[method].apply(this.content, arguments);
      };
      return object;
    }, {});
  };

  var methods = genProxyMethods([
    'deleteRecord',
    'reload',
    'revert',
    'load',
    'save'
  ]);

  App.ModelProxy = Ember.ObjectProxy.extend(methods);

}());


