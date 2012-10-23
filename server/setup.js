/*
  Server methods
 */
Meteor.methods({
});
//============================================================================
//Feching default data from defaultData.js if none exists

//Begin by inserting posts if none exist
if ( Posts.find({}).count() === 0 ) {
  console.log("inserting default posts!");
  for (var i = defaultPosts.length - 1; i >= 0; i--) {
    Posts.insert(defaultPosts[i]);
  };
};