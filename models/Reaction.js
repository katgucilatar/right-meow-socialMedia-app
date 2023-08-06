const { Types, Schema, model } = require('mongoose');
const dayjs = require("dayjs");

// reactionSchema must include reactionId, reactionBody, username, createdAt
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        max_length: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: newDate => dayjs(newDate).format('MMM D, YYYY h:mm A')
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;