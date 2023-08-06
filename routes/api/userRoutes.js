const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users route to get all users and create a user
router
.route('/').get(getUsers).post(createUser);

// /api/users/:userId route to get a single user using userID as well as update and delete user using userID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/to add friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId to delete friends
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;