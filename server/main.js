import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup

    // Creating comment schema
    CommentSchema = new SimpleSchema({
        email: {
            type: String
        },
        text: {
            type: String
        }
    });

    // Creating user schema
    UserSchema = new SimpleSchema({
    	email: {
    		type: String,
    		unique: true
    	},
    	password: {
    		type: String
    	}
    });

    

   

    // Attaching CommentSchema to Comments collection
    Comments.attachSchema(CommentSchema);

    // Attaching UserSchema to Users collection
    Users.attachSchema(UserSchema);

    var commentObj = {
        "email": "a@a.com",
        "text": "test"
    }

    // Validating sample object 
    var isValid = Comments.simpleSchema().namedContext().validate(commentObj, { modifier: false });
    console.log(isValid);

    // if(isValid) {
    // 	Comments.insert(commentObj);
    // }

    console.log(Comments.find().fetch());

    Meteor.publish('comments', function() {
    	return Comments.find();
	});

	Meteor.publish('users', function() {
    	return Users.find();
	});

});
