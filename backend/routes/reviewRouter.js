const express = require('express');
const reveiwController = require('../controllers/reviewsController');
const replyRouter = require('./replyRouter');

const router = express.Router({ mergeParams: true });
router.use('/:reviewId/reply', replyRouter);
router
  .route('/')
  .get(reveiwController.getAllReviews)
  .post(reveiwController.createReview);

router
  .route('/:id')
  .get(reveiwController.getReview)
  .patch(reveiwController.updateReview)
  .delete(reveiwController.deleteReview);

module.exports = router;
