//= require signedInRouteMixin
//= require resetableRouteMixin
//= require ../utils/infiniteScroll
App.AlbumPhotosRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin, App.ResetableRouteMixin);