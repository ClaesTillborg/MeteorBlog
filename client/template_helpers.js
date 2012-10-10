Template.blogPage.postLinks = function() {
	return Posts.find({}, {sort: {date: -1}, fields: {title: 1}});
};

Template.blogPage.post = function() {
	return Posts.find({});
};

Template.blogPage.totalComments = function() {
	var comments = this.comments;
	return comments.length;
};

//--------------------------------------------------Helpers----------------------------------------------------->
Handlebars.registerHelper('header', function() {
//TODO: return User.findOne({_id : userId}, {fields: {name: 1}});
	return "Meteor bloggen";
});
Handlebars.registerHelper('formatDate', function(date) {
	var date = new Date(date);
	months = new Array("Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December");
	days = new Array("söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag");
	var month = months[date.getMonth()];
	var dayName = days[date.getDay()];
	var ret = dayName + " " + date.getDate() + " " + month + " " + date.getFullYear();
	return new Handlebars.SafeString(ret);

});

Handlebars.registerHelper('author', function(userId) {
//TODO: return User.findOne({_id : userId}, {fields: {name: 1}});
	return "Claes Tillborg";
});
