const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    
    // Log the received token
    console.log('Received Token:', token);

    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    
    // Log the decoded token
    console.log('Decoded Token:', decodedToken);

    req.userData = { userId: decodedToken.userId };
    
    // Log the user data attached to the request
    console.log('User Data:', req.userData);

    next();
  } catch (err) {
    // Log any error that occurs during token verification
    console.log('Authentication error:', err);

    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
