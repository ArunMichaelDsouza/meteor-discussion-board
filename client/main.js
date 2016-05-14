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


CommentSchema = new SimpleSchema({
	email: {
		type: String
	},
	text: {
		type: String
	}
});

Comment = new Mongo.Collection('Comment');

Comment.attachSchema(CommentSchema);

var obj = {
	"email": "a@a.com",
	"text": "test"
}

console.log(Comment.simpleSchema().namedContext().validate(obj, {modifier: false}));
