import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { insert } from '../lib/methods.js';

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


 Comments = new Mongo.Collection('Comments');

Tracker.autorun(function(){
	Meteor.subscribe('comments', function() {
		var comments = Comments.find().fetch();
		console.log(comments);
	});
});

Template.login.events({
	'submit .login-form'(event) {

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
		    console.log(err);
		  } else {
		    console.log(res);
		  }
		});
	}
});



