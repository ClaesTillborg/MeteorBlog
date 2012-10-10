Template.blogPage.events({
  'click .addComment': function() {
    var commentText = document.getElementById("addToPost_" + this._id).value;
    if (commentText != false) {
      console.log(comment);
      document.getElementById("addToPost_" + this._id).value = "";
      var date = returnDate(new Date());
      var comment = {
      	content: commentText,
      	date: date,
      	userId: Meteor.userId(),
      	userName: Meteor.user().profile.name
      }
      Posts.update({ _id: this._id}, { $addToSet: { comments: comment }});
    };
  },
  'click .Like_link': function() {
  	Posts.update({ _id: this._id }, { $addToSet: { likes: { name: Meteor.user().profile.name }}});
  },
  'click .Unlike_link': function() {
  	Posts.update({ _id: this._id }, { $pull: { likes: { name: Meteor.user().profile.name }}});
  }
});

function returnDate(d) {
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	if (d.getSeconds > 10) {
		seconds = "0" + seconds;
	};

	return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
}


