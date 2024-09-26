const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(authController.protect);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

router.use(authController.restricted('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:id').delete(userController.deleteUser);
module.exports = router;
