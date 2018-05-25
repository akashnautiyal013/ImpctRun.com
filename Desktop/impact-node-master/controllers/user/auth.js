module.exports = {

    'facebookAuth' : {
        'clientID'      : '578120875673589', // your App ID
        'clientSecret'  : 'f0eba6e5d21baa5ddedbdc0f7967991c', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email,username',
        'profileFields' : ['id', 'email', 'name','username'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '437150569320-j5lcr6thgf0iseinplolc5g5jlp9nl21.apps.googleusercontent.com',
        'clientSecret'  : '1r93rJo0QJZiAeGvQrgNpdUZ',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
