var myRoutes = Backbone.Router.extend({
  
  routes: {
    "":                         "start",
  },
//creating the sessions that will be used.
  start: function() {
  },
});


Router = new myRoutes();

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});