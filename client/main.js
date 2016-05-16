// Module imports
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

// App template helpers
Template.app.onCreated(function() {

	// Subscribe to server side publishes
	Meteor.subscribe('comments'); // Fetch all comments
	Meteor.subscribe('users'); // Fetch user list

	this.LoginError = new ReactiveVar(null); // Error message 
	this.loggedIn = new ReactiveVar(0); // Log in flag
	this.userEmail = new ReactiveVar(0); // Logged in user email
});

Template.app.helpers({
  errorMessage: function() {
    return Template.instance().LoginError.get();
  },
  hasLoggedIn: function() {
  	return Template.instance().loggedIn.get();
  },
  allComments: function() {
  	return Comments.find({}, {sort: {created: -1}})
  }
});

// App events
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
		    template.LoginError.set('Server error. Please try again later');
		  } else {
		    //console.log(res);
		    if(res.statusCode === 200) {
		    	event.target.email.value = event.target.password.value = '';
		    	template.LoginError.set('');

		    	// Set logged in status as true
		    	template.loggedIn.set(1);

		    	// Get logged in user email
		    	template.userEmail.set(res.userData.email);

		    	//console.log(res);
		    }
		    else {
		    	template.LoginError.set(res.message);
		    }
		  }
		});
	},

	// Comment create event
	'submit .comment-form'(event, template, instance) {

		event.preventDefault();

		// Get form data
		const data = {
	      email: template.userEmail.get(),
	      text: event.target.text.value,
	    };

	    // Call comment publish method
	    Meteor.call('newComment.create', {
		 	email: data.email,
		 	text: data.text
		}, (err, res) => {
		  if (err) {
		    //console.log(err);
		  } else {
		    //console.log(res);
		    if(res.statusCode === 200) {
		    	event.target.text.value = '';

		    	//console.log(res);
		    }
		  }
		});
	}
});

