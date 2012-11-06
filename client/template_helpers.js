/* Alla template-helpers
====================================================*/

// Alla helpers till Templaten blogPage
Template.blogPage.helpers({
	// Returnerar en lista på posternas titlar och sorterar dem senaste skrivna.
	postLinks: function () {
		return Posts.find({}, {sort: {date: -1}, fields: {title: 1}});
	},
	// Returnerar posterna och sorterar dem senaste skrivna post
	post: function() {
		return Posts.find({}, {sort: {date: -1}});
	},
	// Får med sig en post som "this" och kan då räkna dess kommentarer.
	// Returerar bara om det finns några.
	totalComments: function() {
		var comments = this.comments.length;
		if (comments > 0) {
			return new Handlebars.SafeString('<dt>Kommentarer:</dt><dd>'+ comments +'</dd>');
		};
		return "";
	},
	// Får med sig en kommentar som "this" och kan då kontrollera
	// om den inloggade användaren har skrivit kommentaren.
	userComment: function() {
		return Meteor.userId() === this.userId;
	},
	// Kontrollerar om användaren har gillat en post och returnerar i så fall en "Sluta gilla-länk".
	likeUnlike: function() {
		var ret = '<span href="#" class="like_link" title="Gilla">Gilla</span>';
		if(this.likes.length > 0) {
			_.each(this.likes, function(like) {
				if (like.userId === Meteor.userId()) {
					ret = '<span class="unlike_link" title="Sluta gilla">Sluta gilla</span>';
				}
			});
		}
		return new Handlebars.SafeString(ret);
	},
	// Kontrollerar antalet likes och om användaren är en av dom.
	// Returnerar en text som passar resultatet.
	likeCount: function() {
		var ret = "";
		var userExists = false;

		// Kollar om någon har gillat posten...
		if(this.likes.length > 0) {

			// Loopar igenom likes-arrayen och kollar om användaren är en av dem...
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
});

//--------------------------------------------------Helpers----------------------------------------------------->

// En publik helper som returnerar ett datum på svenska
Handlebars.registerHelper('formatDate', function(date) {
	var date = new Date(date);
	months = new Array("Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December");
	days = new Array("söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag");
	var month = months[date.getMonth()];
	var dayName = days[date.getDay()];
	var ret = dayName + " " + date.getDate() + " " + month + " " + date.getFullYear();
	return ret;

});
