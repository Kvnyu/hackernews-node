const jwt = require('jsonwebtoken')
const APP_SECRET = 'GraphQL-is-aw3some';

//This function decrypts the token using the app_secret that was used to encrypt it?
function getTokenPayload(token){
    return jwt.verify(token, APP_SECRET)
}
//This function is used in resolvers which require authentication
//It first retrieves the authorization header from the context in the request
//It then verifies the JWT authToken and retrieves the user's ID from it
function getUserId(req, authToken){
    if (req){
        const authHeader = req.headers.authorization;
        if (authHeader){
            const token = authHeader.replace('Bearer ', '');
            if (!token){
                throw new Error('No token found');
            }
            const { userId } = getTokenPayload(token);
            return userId;

        }
    } else if (authToken){
        const {userId} = getTokenPayload(authToken);
        return userId
    }
   throw new Error('Not authenticated')

}


module.exports = {
    APP_SECRET,
    getUserId
};
