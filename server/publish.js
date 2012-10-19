/*
	Publishes the collections
 */

Meteor.publish("posts", function() {
	return Posts.find({});
});
