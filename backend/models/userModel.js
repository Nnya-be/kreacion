const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('node:crypto');
const bcrypt = require('bcrypt');

/** Creating user schema */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide username.'],
    unique: true,
  },
  fullname: {
    type: String,
    required: [true, 'Please provide full name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email Address.'],
  },
  bio: {
    type: String,
    trim: true,
    maxLength: 500,
  },
  businessName: {
    type: String,
    trim: true,
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  location: {
    city: String,
    state: String,
    country: String,
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
  },
  socialMediaHandles: {
    instagram: String,
    twitter: String,
    linkedin: String,
    website: String,
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        validator.isMobilePhone(value);
      },
      message: 'Please provide a valid Phone number!',
    },
  },
  profilePicture: {
    type: String,
    default:
      'https://www.vecteezy.com/vector-art/9292244-default-avatar-icon-vector-of-social-media-user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'Passwords must be more than 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
    validate: {
      validator: function (pass) {
        return this.password === pass;
      },
      message: 'Passwords do not match',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'designer'],
    default: 'user',
  },
  passwordResetToken: String,
  passwordResetExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  verificationToken: String,
  verificationExpiry: Date,
  verified: {
    type: Boolean,
    default: false,
  },
  privacySettings: {
    type: String,
    enum: ['Public', 'Private'],
    default: 'Public',
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.modifiedPassword = function (tokenTime) {
  if (this.passwordChangedAt) {
    const time = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return tokenTime > time;
  }

  return true;
};

userSchema.methods.comparePasswords = async function (
  providedPassword,
  modelPassword,
) {
  return bcrypt.compare(providedPassword, modelPassword);
};

userSchema.methods.generateResetToken = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.passwordResetExpire = Date.now() + 3 * 60 * 1000;

  return token;
};
userSchema.methods.generateVerificationToken = function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.verificationExpiry = Date.now() + 3 * 60 * 1000;

  return token;
};
const User = new mongoose.model('User', userSchema);

module.exports = User;
