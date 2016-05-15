import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	// Server side publishes
    Meteor.publish('comments', function() {

    	// Return comments list
    	return Comments.find();
	});

	Meteor.publish('users', function() {

		// Return users list
    	return Users.find();
	});

});
