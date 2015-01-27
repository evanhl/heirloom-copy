/* global google */

Utils.LocationSearch = Ember.Object.extend({
  autocompleteService: function () {
    return new google.maps.places.AutocompleteService();
  }.property(),

  placesService: function () {
    return new google.maps.places.PlacesService($('<div class="dummy-map"></div>').get(0));
  }.property(),

  search: function (query, callback) {
    this.get('autocompleteService').getPlacePredictions({ input: query }, function (results, status) {
      if (status === "OK" && results instanceof Array) {
        callback(results.map(function (result) {
          return { id: result.place_id, text: result.description };
        }));
      } else {
        callback();
      }
    });
  },

  getLatLng: function (placeId, callback) {
    this.get('placesService').getDetails({ placeId: placeId }, function (place, status) {
      var lat, lng;

      if (status === "OK") {
        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();

        callback({ lat: lat, lng: lng });
      } else {
        callback();
      }
    });
  }
});

