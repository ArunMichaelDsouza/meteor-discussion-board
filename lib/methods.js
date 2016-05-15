Meteor.methods({
  'newUser.create'({ email, password }) {
    new SimpleSchema({
      email: { type: String },
      password: { type: String }
    }).validate({ email, password });

    console.log(email);
    console.log(password);
    console.log(Comments.find().fetch());
  }
});