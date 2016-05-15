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

        // Create user account if it doesn't exist, send success response and redirect to discussion page
        var response;
        if(checkUser === undefined) {

        	response = {
        		userData: user,
        		statusCode: 200,
        		message: 'User account created successfully'
        	}

        	Users.insert(user);
        	return response;
        }
        // Else check if password is correct, send success response and redirect to discussion page
        else {

            if(checkUser.password === password) {
                response = {
                    userData: user,
                    statusCode: 200,
                    message: 'Successfully logged in'
                }
            }
            else {
                response = {
                    statusCode: 400,
                    message: 'Password entered is incorrect'
                }
            }

        	return response;
        }
    }
});


