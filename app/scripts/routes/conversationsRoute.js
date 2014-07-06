//= require signedInRouteMixin
//= require ../utils/infiniteScroll
App.ConversationsRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin);
