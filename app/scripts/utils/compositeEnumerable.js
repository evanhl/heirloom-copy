//= require ./utils

Utils.CompositeEnumerable = Ember.Object.extend(Ember.Enumerable, {
  length:  function () {
    return this.get('arrays').reduce(function (sum, array) {
      return sum + array.get('length');
    }, 0);
  }.property('arrays'),

  nextObject: function (index, previousObject, context) {
    if (index === 0) {
      context.arrayIndex = 0;
      context.indexWithinArray = 0;
    } else {
      context.indexWithinArray++;
    }

    if (context.indexWithinArray >= this.get('arrays')[context.arrayIndex].get('length')) {
      context.arrayIndex++;
      context.indexWithinArray = 0;
    }

    return this.get('arrays')[context.arrayIndex][context.indexWithinArray];
  },

  objectAt: function (index) {
    var i;
    var array;
    var indexWithinArray = index;
    var arrays = this.get('arrays');

    for (i = 0; i < arrays.get('length'); i++) {
      array = arrays[i];

      if (indexWithinArray >= array.get('length')) {
        indexWithinArray -= array.get('length');
      } else {
        return array[indexWithinArray];
      }
    }
  }
});