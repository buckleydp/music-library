const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artist');
const albumController = require('../controllers/album');

router
  .route('/')
  .get(artistController.list)
  .post(artistController.insert);

router
  .route('/:artistId')
  .get(artistController.getOne)
  .patch(artistController.editOne)
  .delete(artistController.deleteOne);

router
  .route('/:artistId/album')
  .post(albumController.insert);

module.exports = router;