const { User } = require('../models');

const userController = {
  // Get all users
  getUsers(req, res) {
    User.find()
    .select('-__v')
    .then((dbUserData) => {
      res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
       res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err);
      });
  },
  // Delete a user 
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No such user exists' });
        }
        res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a friend
  addFriend(req, res) {
    User.findOneAndRemove({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No such user exists' });
        }
        res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!'});
      }
        res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
  });
},
};
