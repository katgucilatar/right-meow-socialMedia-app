const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        const thoughtObj = {
          thoughts
        };
        return res.json(thoughtObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user by ID
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .lean();
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json({
          thought
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Create thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

     // Update user
     async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate({
            _id: req.params.thoughtId,
          });
    
          if (!thought) {
            return res.status(404).json({ message: 'No such thought exists' });
          }       
    
          res.json({ message: 'Thought successfully updated' });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
      },

    // Delete thought
    async removeThought(req, res) {
      try {
        const thought = await Thought.findOneAndRemove({
          _id: req.params.thoughtId,
        });
  
        if (!thought) {
          return res.status(404).json({ message: 'No such thought exists' });
        }    

          await User.deleteMany({ _id: { $in: thought.users } });
        res.json({ message: 'Thought successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // Add reaction
    async addReaction(req, res) {
      try {
        console.log('You are adding a reaction');
        console.log(req.body);
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove reaction
    async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };