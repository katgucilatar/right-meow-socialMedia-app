// ObjectId() method to turn string into ObjectId to query database for friendCount virtual
const { ObjectId } = require('mongoose').Types;
const { Schema, model } = require('mongoose');

// userSchema must include username, email, thoughts, and friends
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            validate: {
                validator: function(userEmail) {
                    var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                    return regex.test(userEmail);
                }
            },
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Email address must be valid']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// virtual() method to get friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;