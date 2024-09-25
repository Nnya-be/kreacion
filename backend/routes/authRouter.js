const authController = require('../controllers/authController');
const express = require('express');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/update-password', authController.updatePassword);
module.exports = router;
