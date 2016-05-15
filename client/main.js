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




Tracker.autorun(function(){
	Meteor.subscribe('comments', function() {
		var comments = Comments.find().fetch();
		console.log(comments);
	});

	Meteor.subscribe('users', function() {
		var users = Users.find().fetch();
		console.log(users);
	});
});



Template.login.onCreated(function() {
	this.lastError = new ReactiveVar(null);
});

Template.login.helpers({
  errorMessage: function() {
    return Template.instance().lastError.get();
  }
});



Template.login.events({
	'submit .login-form'(event, template) {

		event.preventDefault();

		const data = {
	      email: event.target.email.value,
	      password: event.target.password.value,
	    };

	    console.log(data);


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
		    }
		    else {
		    	template.lastError.set(res.message);
		    }
		  }
		});
	}
});



