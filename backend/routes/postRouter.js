const express = require('express');
const postController = require('../controllers/postController');
const reviewRouter = require('./reviewRouter');

const router = express.Router();

router.use('/:post_id/reviews', reviewRouter);
router
  .route('/')
  .get(postController.getAllPosts)
  .post(postController.createPost);

router
  .route('/:id')
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;

