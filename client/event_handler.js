/* Alla template-events
====================================================*/

// Alla events som är kopplade till Templaten blogPage
Template.blogPage.events({
  // Hämtar kommentaren och skickar den tillsammans
  // med posten till metoden som lägger till kommentaren. 
  'click .addComment': function() {
    add.comment(this, document.getElementById("addToPost_" + this._id).value);
    document.getElementById("addToPost_" + this._id).value = "";
  },
  // Om enter trycks i textrutan skickas värdet
  // och posten till metoden som lägger till kommentaren.
  'keyup .commentTextBox': function(event) {
    if(event.which === 13) {
      add.comment(this, event.target.value);
      event.target.value = "";
    }
  },
  'click .addPost': function() {
    add.post();
  },
  // Om enter trycks i textrutan körs spara-metoden
  'keyup #addPostContent': function(event) {
    if(event.which === 13) {
      add.post();
    }
  },
  //gillar och slutar gilla en bloggpost
  'click .like_link': function() {
  	Posts.update({ _id: this._id }, { $addToSet: { likes: { userId: Meteor.userId(), userName: Meteor.user().profile.name }}});
  },
  'click .unlike_link': function() {
  	Posts.update({ _id: this._id }, { $pull: { likes: { userId: Meteor.userId()}}});
  },
  // Tar bort kommentar
  'click .removeComment': function() {
    Posts.update({_id : this.parentId}, { $pull: { comments: { date: this.date}}});
  }
});

// Egen funktion som sparar undan poster och kommentarer.
var add = {
  // Hämtar titel och text, skapar ett post-objekt och lägger in den i databasen
  post: function() {
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
      document.getElementById("addPostTitle").value = "";
      document.getElementById("addPostContent").value = "";
    };
  },
  // Tar emot kommentaren och den post den ska tillhöra och skapar ett kommentar-objekt.
  // Lägger in objektet i posten.
  comment: function(post, text) {
    if (text != false) {
      var date = returnDate(new Date());
      var comment = {
        parentId: post._id,
        content: text,
        date: date,
        userId: Meteor.userId(),
        userName: Meteor.user().profile.name
      }
      Posts.update({ _id: post._id}, { $addToSet: { comments: comment }});
    };
  }
};

// Returnerar ett datum ex "yyyy-mm-dd hh:mm:ss"
function returnDate(d) {
	var year = d.getFullYear();
	var month = correctNumber(d.getMonth()) + 1;
	var date = correctNumber(d.getDate());
	var hours = correctNumber(d.getHours());
	var minutes = correctNumber(d.getMinutes());
	var seconds = correctNumber(d.getSeconds());
	
  function correctNumber(number) {
    if (number < 10) {
      number = "0" + number;
    };
    return number;
  }
	return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
};

