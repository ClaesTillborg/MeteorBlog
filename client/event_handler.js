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

  'click .addPost': function() {
    var title = document.getElementById("addPostTitle").value;
    var content = document.getElementById("addPostContent").value;
    if (title !== '' && content !== '') {
      Posts.insert(
      {
        "title" : title,
        "date" : new Date(),
        "userId" : Meteor.userId(),
        "content" : content,
        "comments" : [],
        "likes" : []
      });
    };
    /**/
  },

  'click .Like_link': function() {
  	Posts.update({ _id: this._id }, { $addToSet: { likes: { name: Meteor.user().profile.name }}});
  },

  'click .Unlike_link': function() {
  	Posts.update({ _id: this._id }, { $pull: { likes: { name: Meteor.user().profile.name }}});
  },

  'mouseenter .comment': function() {
    if (this.userId === Meteor.userId()) {
      event.target.className += " active";
    };
  },

  'mouseleave .comment': function() {
    event.target.className = "comment";
  },

  'click .removeComment': function() {
    console.log(this.data);
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
};

