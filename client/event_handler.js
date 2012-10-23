Template.blogPage.events({
  'click .addComment': function() {
    var commentText = document.getElementById("addToPost_" + this._id).value;
    if (commentText != false) {
      document.getElementById("addToPost_" + this._id).value = "";
      var date = returnDate(new Date());
      var comment = {
        parentId: this._id,
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
        "userName" : Meteor.user().profile.name,
        "content" : content,
        "comments" : [],
        "likes" : []
      });
    };
    /**/
  },

  'click .like_link': function() {
  	Posts.update({ _id: this._id }, { $addToSet: { likes: { userId: Meteor.userId(), userName: Meteor.user().profile.name }}});
  },

  'click .unlike_link': function() {
  	Posts.update({ _id: this._id }, { $pull: { likes: { userId: Meteor.userId()}}});
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
    Posts.update({_id : this.parentId}, { $pull: { comments: { date: this.date}}});
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

