Template.blogPage.postLinks = function() {
	return Posts.find({}, {sort: {date: -1}, fields: {title: 1}});
};

Template.blogPage.post = function() {
	return Posts.find({}, {sort: {date: -1}});
};

Template.blogPage.totalComments = function() {
	var comments = this.comments.length;
	if (comments > 0) {
		return new Handlebars.SafeString('<dt>Kommentarer:</dt><dd>'+ comments +'</dd>');
	};
	return "";
};

Template.blogPage.userComment = function() {
	return Meteor.userId() === this.userId;
};
Template.blogPage.likeUnlike = function() {
	var ret = '<span href="#" class="like_link" title="Gilla">Gilla</span>';
	if(this.likes.length > 0) {
		_.each(this.likes, function(like) {
			if (like.userId === Meteor.userId()) {
				ret = '<span class="unlike_link" title="Sluta gilla">Sluta gilla</span>';
			}
		});
	}
	return new Handlebars.SafeString(ret);
};

Template.blogPage.likeCount = function() {
	var ret = "";
	var userExists = false;

	//Check if some one likes the post...
	if(this.likes.length > 0) {

		//Loop through the array of likes and check if user is one of them...
		_.each(this.likes, function(like) {
			if (like.userId === Meteor.userId()) {
				userExists = true;
			}
		});

		if(userExists) {
			if(this.likes.length === 1) {
				ret = "Du";
			} else {
				ret = "Du och " + this.likes.length + " till"
			}
		} else {
			ret = this.likes.length;
		}

		ret += " gillar denna post!"
	}

	return ret;
}

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
