/* global google */

App.LocationSearchComponent = Ember.Component.extend({
  placesService: function () {
    return new google.maps.places.PlacesService($('<div id="g-map">').get(0));
  }.property(),

  didInsertElement: function () {
    var self = this;

    this.$('input').select2({
      minimumInputLength: 3,
      multiple: true,
      query: function (query) {
        self.get('placesService').textSearch({ query: query.term }, function (results) {
          var transformedResults = results.map(function (place) {
            return { text: place.formatted_address, id: place.id };
          });

          query.callback({ results: transformedResults });
        });
      }
    });
  }
});