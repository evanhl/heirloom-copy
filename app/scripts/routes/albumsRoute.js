//= require signedInRouteMixin
//= require ../utils/infiniteScroll
App.AlbumsRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin);
