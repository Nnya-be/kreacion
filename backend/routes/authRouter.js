const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.post('/verify/:token', authController.verifyUser);
router.use(authController.protect);
router.patch('/update-password', authController.updatePassword);
module.exports = router;
