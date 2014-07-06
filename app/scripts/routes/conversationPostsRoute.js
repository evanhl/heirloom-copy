//= require resetableRouteMixin
//= require signedInRouteMixin
//= require ../utils/infiniteScroll
App.ConversationPostsRoute = Ember.Route.extend(App.SignedInRouteMixin, InfiniteScroll.RouteMixin, App.ResetableRouteMixin);