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

        var date = new Date();

        const user = {
        	email: email,
        	password: password,
            created: date
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
            // If password is incorrect throw error
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

// Method to add new comment
Meteor.methods({
    'newComment.create' ({ email, text }) {

        // Validate comment data to a schema
        new SimpleSchema({
            email: { type: String },
            text: { type: String }
        }).validate({ email, text });  

        // Create comment data object 

        var date = new Date();

        const comment = {
            email: email,
            text: text,
            created: date
        };
        
        // Insert new comment to list
        Comments.insert(comment);

        // Return success response
        var response = {
            comment: comment,
            statusCode: 200,
            message: 'Comment added successfully'
        }

        return response;
    }
});



