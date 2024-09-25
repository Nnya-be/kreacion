const express = require('express');
const reveiwController = require('../controllers/reviewsController');

const router = express.Router();

router
  .route('/')
  .get(reveiwController.getAllReviews)
  .post(reveiwController.createReview);

router
  .route('/:id')
  .get(reveiwController.getReview)
  .delete(reveiwController.deleteReview);

module.exports = router;
