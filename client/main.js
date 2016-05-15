// Module imports
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

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
Template.login.onCreated(function() {
	this.lastError = new ReactiveVar(null);
});

Template.login.helpers({
  errorMessage: function() {
    return Template.instance().lastError.get();
  }
});

// Login template events
Template.login.events({

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

		    	// template.loggedIn.set(true);
		    	// console.log(template.loggedIn.get());
		    	
		    	//console.log(res.message);
		    }
		    else {
		    	template.lastError.set(res.message);
		    }
		  }
		});
	}
});



