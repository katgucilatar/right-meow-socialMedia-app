const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts route to get all thoughts and create a thought
router
.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId route to get a single thought using thoughtId as well as update and delete thoughts using thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(removeThought);

// /api/thoughts/:thoughtId/reactions to add and delete friends reactions using thoughtId
router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;