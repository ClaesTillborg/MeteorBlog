Template.blogPage.events({
  'click .addComment': function() {
    var comment = document.getElementById("addToPost_" + this._id).value;
    if (comment != false) {
      console.log(comment);
      document.getElementById("addToPost_" + this._id).value = "";
    };
  }
});




