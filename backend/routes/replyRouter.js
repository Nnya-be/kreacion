const express = require('express');
const replyController = require('../controllers/replyController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(replyController.getAllReply)
  .post(replyController.createReply);

router
  .route('/:id')
  .get(replyController.getReply)
  .patch(replyController.updateReply)
  .delete(replyController.deleteReply);
module.exports = router;
