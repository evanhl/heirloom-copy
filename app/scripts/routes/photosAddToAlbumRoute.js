//= require signedInRouteMixin
//= require ../utils/infiniteScroll
App.PhotosAddToAlbumRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin);