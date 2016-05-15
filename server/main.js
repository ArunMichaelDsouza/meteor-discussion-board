import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup

    // Creating comment schema
    CommentSchema = new SimpleSchema({
        email: {
            type: String,
            unique: true
        },
        text: {
            type: String
        }
    });

    // Creating comments collection
    Comments = new Mongo.Collection('Comments');

    // Attaching CommentSchema to Comments collection
    Comments.attachSchema(CommentSchema);

    var obj = {
        "email": "a@a.com",
        "text": "test"
    }

    // Validating sample object 
    var isValid = Comments.simpleSchema().namedContext().validate(obj, { modifier: false });
    console.log(isValid);

});
