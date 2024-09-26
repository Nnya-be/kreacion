const crypto = require('crypto');
const { promisify } = require('node:util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { mailHandler } = require('../utils/mailHandler');
/**
 * Generate a JSON Web Token (JWT) for a given user ID.
 *
 * @param {string} user_id - The ID of the user to generate the token for.
 * @returns {string} - The signed JWT token.
 *
 * @example
 * const token = signToken(user);
 * console.log(token);
 *
 * @description
 * This function creates a JWT for authentication purposes. The token includes the user's ID
 * as the payload and is signed with a secret key defined in the environment variables.
 * The token's expiration time is also set based on the environment configuration.
 */
const signToken = (user_id) => {
  const options = {
    expiresIn: process.env.JWT_EXPIRE,
  };
  const payload = {
    user_id,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

/**
 * Create a JSON Web Token (JWT), set it in a cookie, and send a response with the token and user data.
 *
 * @param {Object} user - The user object for which the token is created.
 * @param {string} user.id - The ID of the user.
 * @param {number} statusCode - The status code to be set in the response.
 * @param {Object} res - The response object from Express.
 *
 * @returns {user} data - The data of the user that just created the token.
 *
 * @example
 * const user = { id: '12345', password: 'secret' };
 * createToken(user, 200, res);
 *
 * @description
 * This function generates a JWT for a given user, sets the token in a cookie with specified options,
 * and sends a JSON response with the token and user data (excluding the password).
 */
const createToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookie_op = {
    expiresIn: new Date(Date.now() + process.env.JWT_EXPIRE * 24 * 3600000),
    httpOnly: true,
    // secure:true,
  };

  if (process.env.NODE_ENV === 'production') cookie_op.secure;

  res.cookie('jwt', token, cookie_op);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
/**
 * Sign up a new user, create a verification token, send a verification email,
 * and respond with a JWT token and user data.
 *
 * @route POST /api/v1/users/signup
 * @access Public
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} req.body - The request body containing user details.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {string} req.body.passwordConfirm - The confirmed password of the new user.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {void}
 *
 * @example
 * // Example POST request to sign up a new user
 * const response = await axios.post('/api/v1/users/signup', {
 *   username: 'exampleuser',
 *   email: 'example@example.com',
 *   password: 'password123',
 *   passwordConfirm: 'password123',
 * });
 *
 * @description
 * This function handles the signup process for a new user. It validates and creates a new user
 * in the database, generates a verification token, sends a verification email with the token,
 * and responds with a JWT token and user data upon successful signup.
 */
module.exports.signUp = catchAsync(async (req, res, next) => {
  if (!req.body) {
    return next(new AppError('Provide user details!', 401));
  }

  if (!req.body.email || !req.body.username) {
    return next(new AppError('Provide A Username and Email field!', 401));
  }

  const newUser = await User.create({
    username: req.body.username,
    fullname: req.body.fullname,
    bio: req.body.bio,
    businessName: req.body.businessName,
    location: req.body.location,
    yearsOfExperience: req.body.yearsOfExperience,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = newUser.generateVerificationToken();
  await newUser.save({ validateBeforeSave: false });
  const verificationUrl = `${req.protocol}://file-server-cyan-three.vercel.app/verify/${token}`;
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
          }
          h1 {
              font-size: 28px;
              color: #333;
          }
          p {
              font-size: 20px;
              color: #555;
              line-height: 1.5;
          }
          a {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
          a:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>User Verification Code</h1>
          <p>
              Hello, ${newUser.username}, welcome to Lizzy's Ent. Please click on the button below to verify your account.
              <br/>
              This verification link is only valid for 5 mins. Thank You.
          </p>
          <p>
          <a href="${verificationUrl}">Verify Account</a>
          </p>
          </div>
  </body>
  </html>`;

  try {
    await mailHandler({
      from: process.env.MAIL_USER,
      to: newUser.email,
      subject: 'Account Verification',
      html,
    });
  } catch (err) {
    newUser.verificationToken = undefined;
    newUser.verificationExpiry = undefined;
    await newUser.save({ validateBeforeSave: false });

    return next(new AppError('Error on sending mail!', 500));
  }
  createToken(newUser, 201, res);
});

/**
 * Verify user account using the verification token.
 *
 * @route GET /api/v1/users/verify/:token
 * @access Public
 *
 * @param {Object} req - The request object from Express.
 * @param {string} req.params.token - The verification token extracted from the route parameters.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {void}
 *
 * @example
 * // Example GET request to verify user account
 * const response = await axios.get('/api/v1/users/verify/abcdef123456');
 *
 * @description
 * This function verifies a user account using the provided verification token. It searches
 * for a user in the database with a matching token and ensures the token has not expired.
 * If successful, it updates the user's verification status and responds with a success message.
 * If no user is found or the token is invalid or expired, it returns an error.
 */
module.exports.verifyUser = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user_document = await User.findOne({
    verificationToken: token,
  });

  if (!user_document) {
    return next(new AppError('Invalid link or token', 400));
  }

  user_document.verified = true;
  user_document.verificationToken = undefined;
  user_document.verificationExpiry = undefined;
  await user_document.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: 'Account Verified Successfully!',
  });
});

/**
 * Log in user with email and password.
 *
 * @route POST /api/v1/users/login
 * @access Public
 *
 * @param {Object} req - The request object from Express.
 * @param {string} req.body.email - The email of the user logging in.
 * @param {string} req.body.password - The password of the user logging in.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {void}
 *
 * @example
 * // Example POST request to log in user
 * const response = await axios.post('/api/v1/users/login', {
 *   email: 'user@example.com',
 *   password: 'password123',
 * });
 *
 * @description
 * This function handles the login process for a user. It verifies the provided email
 * and password, compares the password with the hashed password stored in the database,
 * and if successful, generates a JWT token for authentication. The token is then sent
 * in a cookie and the user object is returned in the response data. If login fails due
 * to incorrect credentials, it returns an error.
 */
module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Incorrect Password or Email!', 400));
  }
  const user_acc = await User.findOne({ email }).select('+password');
  if (!user_acc) {
    return next(new AppError('Incorrect Password or Email!', 400));
  }

  const match = await user_acc.comparePasswords(password, user_acc.password);
  if (!match) {
    return next(new AppError('Incorrect Password or Email!', 400));
  }

  createToken(user_acc, 200, res);
});

/**
 * Logout handler function.
 *
 * @function
 * @name logout
 * @memberof module:controllers/authController
 * @description This function handles the user logout process by destroying the user session and clearing the session cookie.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @returns {Promise<void>} - Sends a JSON response indicating the success or failure of the logout process.
 *
 * @example
 * // Route to handle user logout
 * router.get('/logout', authController.logout);
 *
 * @example
 * // Sample request
 * fetch('/api/v1/users/logout', {
 *   method: 'GET',
 *   credentials: 'include'
 * })
 * .then(response => response.json())
 * .then(data => console.log(data))
 * .catch(error => console.error('Error:', error));
 *
 * @throws {Error} If there is an error during the session destruction process, a 500 status code is sent with an error message.
 */
module.exports.logout = catchAsync(async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new AppError("Couldn't Sign Out User", 500));
    }
    // Clear the cookie
    res.clearCookie('connect.sid');
    res.status(200).json({
      status: 'success',
      message: 'User logged out successfully!',
    });
  });
});
/**
 * Middleware to protect routes requiring authentication.
 *
 * @route Middleware
 * @access Protected
 *
 * @param {Object} req - The request object from Express.
 * @param {string} req.headers.authorization - The authorization header containing the JWT.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {void}
 *
 * @example
 * // Example usage in a route handler
 * router.get('/protected', protect, (req, res) => {
 *   res.json({ message: 'You are authorized to access this route!' });
 * });
 *
 * @description
 * This middleware checks if the request contains a valid JWT token in the authorization
 * header. If the token is valid, it verifies the user's identity and ensures that the user
 * has not modified their password since the token was issued. If all checks pass, it sets
 * the `req.user` object to the authenticated user and calls the next middleware. If any
 * checks fail, it returns an error indicating the failure reason (e.g., invalid token,
 * expired token, or user modified password).
 */
module.exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  /** Checks for the token existance. */
  if (!token) {
    return next(new AppError('Please login to access this route.', 401));
  }

  const decoded_token = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  /** extracts the userid and query for it */
  const userAcc = await User.findById(decoded_token.user_id);

  if (!userAcc) {
    return next(new AppError('Invalid Token!', 401));
  }

  /** Check if the user has changed the password since the token was issued */
  if (!userAcc.modifiedPassword(decoded_token.iat)) {
    return next(new AppError('Invalid Token!', 401));
  }
  req.user = userAcc;

  next();
});

/**
 * Middleware to restrict access based on user roles.
 *
 * @route Middleware
 * @access Restricted
 *
 * @param {...string} role - Allowed roles to access the route.
 * @param {Object} req - The request object from Express.
 * @param {string} req.user.role - The role of the authenticated user.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {void}
 *
 * @example
 * // Example usage in a route handler
 * router.get('/admin-only', protect, restricted('admin'), (req, res) => {
 *   res.json({ message: 'You are authorized to access this admin-only route!' });
 * });
 *
 * @description
 * This middleware restricts access to routes based on user roles. It checks if the
 * authenticated user's role matches any of the roles specified during middleware
 * initialization. If the user's role is not included in the allowed roles, it returns
 * a permission denied error (403). If the user's role is allowed, it proceeds to the
 * next middleware.
 */
module.exports.restricted = (...role) => {
  return async (req, res, next) => {
    if (!role.includes(req.user.role))
      return next(new AppError('Permission denied for this route', 403));
    next();
  };
};

/**
 * Forgot Password: Initiates password reset process for a user.
 *
 * @route POST /api/v1/users/forgot-password
 * @access Public
 *
 * @param {Object} req - The request object from Express.
 * @param {string} req.body.email - The email address of the user requesting password reset.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {Object} - JSON response indicating success or failure.
 *
 * @example
 * // Example usage in a route handler
 * router.post('/forgot-password', forgotPassword);
 *
 * @description
 * This controller handles the forgot password functionality. It verifies the existence
 * of the user with the provided email address, generates a password reset token, sends
 * a password reset email with a link containing the reset token, and handles errors if
 * any occur during the process.
 */
module.exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user_mail = req.body.email;

  const user_document = await User.findOne({ email: user_mail });

  if (!user_document || !user_mail) {
    return next(new AppError('Wrong Credentials!', 401));
  }
  const reset_token = user_document.generateResetToken();
  await user_document.save({ validateBeforeSave: false });

  const reset_url = `${req.protocol}://file-server-cyan-three.vercel.app/reset/${reset_token}`;

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
          }
          h1 {
              font-size: 28px;
              color: #333;
          }
          p {
              font-size: 20px;
              color: #555;
              line-height: 1.5;
          }
          a {
              display: inline-block;
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
          }
          a:hover {
              background-color: #0056b3;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Password Reset Request</h1>
          <p>
              Forgot Password? Click on the link below to submit your request. If you did not request this, please ensure your account is not being breached or ignore this email.
          </p>
          <p>
              <a href="${reset_url}">Reset Password</a>
          </p>
      </div>
  </body>
  </html>`;

  try {
    await mailHandler({
      from: process.env.MAIL_USER,
      to: user_document.email,
      subject: 'Password Reset',
      html,
    });

    res.status(200).json({
      status: 'Success',
      reset_token,
      reset_url,
    });
  } catch (err) {
    user_document.passwordResetToken = undefined;
    user_document.passwordResetExpiration = undefined;
    await user_document.save({ validateBeforeSave: false });

    return next(new AppError('Error on sending mail!', 500));
  }
});

/**
 * Reset Password: Resets the password for a user with a valid reset token.
 *
 * @route POST /api/v1/users/reset-password/:token
 * @access Public
 *
 * @param {Object} req - The request object from Express.
 * @param {string} req.params.token - The reset token sent to the user's email.
 * @param {string} req.body.password - The new password to set for the user.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {Object} - JSON response indicating success or failure.
 *
 * @example
 * // Example usage in a route handler
 * router.post('/reset-password/:token', resetPassword);
 *
 * @description
 * This controller resets the password for a user using a valid reset token. It verifies
 * the token's validity and expiration, updates the user's password, and clears the reset
 * token after successful password reset. If the token is invalid or expired, it returns an
 * error response.
 */
module.exports.resetPassword = catchAsync(async (req, res, next) => {
  const token = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user_document = await User.findOne({
    passwordResetToken: token,
    passwordResetExpire: { $gte: Date.now() },
  });

  if (!user_document) {
    return next(new AppError('Invalid link or token', 400));
  }
  user_document.password = req.body.password;
  user_document.passwordResetExpire = undefined;
  user_document.passwordResetToken = undefined;
  await user_document.save({ validateBeforeSave: false });

  createToken(user_document, 200, res);
});

/**
 * Update Password: Updates the password for the authenticated user.
 *
 * @route PATCH /api/v1/users/update-password
 * @access Private
 *
 * @param {Object} req - The request object from Express.
 * @param {string} req.user.id - The ID of the authenticated user.
 * @param {string} req.body.oldPassword - The old password to verify before updating.
 * @param {string} req.body.newPassword - The new password to set for the user.
 * @param {string} req.body.passwordConfirm - The confirmation of the new password.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next function to call middleware.
 *
 * @returns {Object} - JSON response indicating success or failure.
 *
 * @example
 * // Example usage in a route handler
 * router.patch('/update-password', protect, updatePassword);
 *
 * @description
 * This controller updates the password for the authenticated user. It first verifies
 * the old password provided matches the current password stored in the database. If
 * verified, it updates the password to the new one provided and confirms it. If the
 * old password doesn't match, it returns an error response.
 */
module.exports.updatePassword = catchAsync(async (req, res, next) => {
  const user_document = await User.findById(req.user.id).select('+password');
  if (
    !(await user_document.comparePasswords(
      req.body.oldPassword,
      user_document.password,
    ))
  ) {
    return next(new AppError('Invalid Password!', 401));
  }
  user_document.password = req.body.newPassword;
  user_document.passwordConfirm = req.body.passwordConfirm;
  await user_document.save();

  res.status(200).json({
    status: 'success',
  });
});
