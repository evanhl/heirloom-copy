//= require signedInRouteMixin
//= require ../utils/infiniteScroll
App.PhotosRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin);