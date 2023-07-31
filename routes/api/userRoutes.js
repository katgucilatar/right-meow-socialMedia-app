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
router.route('/:userId').get(getSingleUser).udpate(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId to add and delete friends using userID and friendID
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;