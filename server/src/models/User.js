import{ Schema, model } from 'mongoose';

const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        refreshToken: String
    },
    {
        virtuals: {
            fullName: {
                get() {
                    return `${this.firstName} ${this.lastName}`;
                }
            },

            id: {
                get() {
                    return this._id;
                }
            }
        }
    }
);

const user = model('user', UserSchema);

module.exports = user;