import PostModel from "../Models/PostSchema.js";

// ============ creating a post ========
export const CreatePost = async (req, res)=>{

    const createPost = await PostModel(req.body);
    try{
        await createPost.save();
        res.status(200).json(createPost)
    }
    catch(err){
        res.status(500).json(err)
    }
}

//=================== GET POST ==========
export const GetPost = async (req,res)=>{
    const postid = req.params.id;

    try{
        const post = await PostModel.findById(postid);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json(err)
    }
}

// =========== updating post =========

export const UpdatePost = async (req,res)=>{
    const PostID = req.params.id;
    const {userID} = req.body;
    
    try
     {
        const post = await PostModel.findById(PostID);
        if(post.UserID === userID)
            {
              await PostModel.updateOne({$set: req.body})
            res.status(200).json("post updated successfully");
           }
    
        else{
        res.status(403).json("You can't update other user post");
         }
    }
    catch(err){
        res.status(500).json(err);
    }
}

// =========== DELETING A POST ===========
export const DeletePost = async (req,res)=>{
    const postid = req.params.id;
    const {userID} = req.body;

    try{
       const post = await PostModel.findById(postid);
       if(post.UserID === userID){
          await post.deleteOne();
          res.status(200).json("Post Deleted Successfully")
       }
       else{
         res.status(403).json("You cannot Delete Other User posts")
       }
    }
    catch(err){
        res.status(500).json(err);
    }
}

// ============= LIKE & DISLIKE A POST =====
export const Like_Dislike_Post = async (req,res)=>{
    const postid = req.params.id;
    const {userid} = req.body;

    try{
        const post = await PostModel.findById(postid);
        if(!post.likes.includes(userid)){
            await post.updateOne({$push: {likes: userid}});
            res.status(200).json("Post Liked Successfully")
        }
        else{
            //--------- Dislike the same post ------
            await post.updateOne({$pull: {likes: userid}})
            res.status(200).json("POST IS UNLIKED")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

// ============= TIMELINE POSTS ============
