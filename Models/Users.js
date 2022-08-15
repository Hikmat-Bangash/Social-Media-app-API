import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    profilePicture:{ type: String},
    coverPicture: { type: String},
    about: { type: String},
    livesin: { type: String},
    worksAt: { type: String},
    relationship: { type: String},
    followers: [],
    following: []

},
 {timestamps: true}
)

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;

