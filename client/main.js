// Module imports
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

// Subscribe to server side publishes
Tracker.autorun(function(){

	// Fetch all comments
	Meteor.subscribe('comments', function() {
		var comments = Comments.find().fetch();
		console.log(comments);
	});

	// Fetch user list
	Meteor.subscribe('users', function() {
		var users = Users.find().fetch();
		console.log(users);
	});
});


// Login template helpers
Template.app.onCreated(function() {
	this.lastError = new ReactiveVar(null);
	this.loggedIn = new ReactiveVar(0);
});

Template.app.helpers({
  errorMessage: function() {
    return Template.instance().lastError.get();
  },
  hasLoggedIn: function() {
  	return Template.instance().loggedIn.get();
  }
});

// Login template events
Template.app.events({

	// Login form submit event
	'submit .login-form'(event, template) {

		event.preventDefault();

		// Get form data
		const data = {
	      email: event.target.email.value,
	      password: event.target.password.value,
	    };

	    // Call user creation method
	    Meteor.call('newUser.create', {
		 	email: data.email,
		 	password: data.password
		}, (err, res) => {
		  if (err) {
		    //console.log(err);
		    template.lastError.set('Server error. Please try again later');
		  } else {
		    //console.log(res);
		    if(res.statusCode === 200) {
		    	event.target.email.value = event.target.password.value = '';
		    	template.lastError.set('');

		    	// Set logged in status as true
		    	template.loggedIn.set(1);

		    	//console.log(res.message);
		    }
		    else {
		    	template.lastError.set(res.message);
		    }
		  }
		});
	}
});



