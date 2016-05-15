// Method to create new user account
Meteor.methods({
    'newUser.create' ({ email, password }) {

    	// Validate user data to a schema
        new SimpleSchema({
            email: { type: String },
            password: { type: String }
        }).validate({ email, password });  

        // Check if current user email already exists
        var checkUser = Users.findOne({email: email});

        // Create user data object 
        const user = {
        	email: email,
        	password: password
        };

        // Create user account if it doesn't exist and send success response
        if(checkUser === undefined) {

        	var response = {
        		userData: user,
        		statusCode: 200,
        		message: "User account created successfully"
        	}

        	Users.insert(user);
        	return response;
        }
        // Else throw error
        else {
        	var response = {
        		statusCode: 403,
        		message: "A user with that email id already exists"
        	}

        	return response;
        }
    }
});


