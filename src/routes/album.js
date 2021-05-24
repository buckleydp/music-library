const express = require('express');

const router = express.Router();

const albumController = require('../controllers/album');

router.route('/albums').get(albumController.getAll);

router
  .route('/')
  .get(albumController.listAllFromArtist)

router
  .route('/:albumId')
  .get(albumController.getOne)
  .patch(albumController.changeOne)
  .delete(albumController.deleteOne);

module.exports = router;