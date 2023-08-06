const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');
const dayjs = require("dayjs");
const reactionSchema = require('./Reaction')

// thoughtSchema must include thoughtText, createdAt, username, and reactions
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true, 
            min_length: 1,
            max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: newDate => dayjs(newDate).format('MMM D, YYYY h:mm A')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// virtual() method to get reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;