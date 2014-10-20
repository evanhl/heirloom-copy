//= require signedInRouteMixin
//= require ../utils/infiniteScroll
App.AlbumsIndexRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin);
