// Module imports
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

	// Server side publishes
    Meteor.publish('comments', function() {

    	// Return sorted comments list
    	return Comments.find({}, {sort: {created: -1}});
	});

	Meteor.publish('users', function() {

		// Return users list
    	return Users.find();
	});

});
