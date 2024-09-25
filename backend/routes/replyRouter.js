const express = require('express');
const replyController = require('../controllers/replyController');

const router = express.Router();

router
  .route('/')
  .get(replyController.getAllReply)
  .post(replyController.createReply);

router
  .route('/:id')
  .get(replyController.getReply)
  .delete(replyController.deleteReply);
module.exports = router;
