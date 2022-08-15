import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    UserID: {
        type: String,
        required: true
    },
    des: {type: String},
    image: {type: String},
    likes: []
})

const PostModel = mongoose.model('Posts', PostSchema);

export default PostModel;