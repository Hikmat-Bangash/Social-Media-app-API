import UserModel from "../Models/Users.js";
import bcrypt from "bcrypt";

// getting a single user record
export const getuser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      // when we dont want to show user password
      const { password, ...details } = user._doc;
      res.status(200).json(details);
    } else {
      res.status(404).json("This user is not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//=================== get a user and update his record ===============
export const userUpdate = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, AdminStatus, password } = req.body;

  if (currentUserId === id || AdminStatus) {
    try {
      //    if user want to change their password
      if (password) {
        req.body.password = await bcrypt.hash(password, 10);
      }
      const updatedRecord = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      await updatedRecord.save();
      res.status(200).json(updatedRecord);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json("unable to update record, wrong user");
  }
};

// =============== DELETE USER ==========
export const DeleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};

// ============== Follow a user ============
export const FollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUser } = req.body;

  if (id === currentUser) {
    res.status(403).json("Request Forbidden! User cannot follow themselves");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUser);

      //  checking a user whether is already followed or not
      if (!followUser.followers.includes(currentUser)) {
        await followUser.updateOne({ $push: { followers: currentUser } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User Followed Successfully");
      } else {
        res.status(403).json("User already Followed");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
};

// ============ UNFOLLOW USER =================
export const UnfollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUser } = req.body;
  // ------- if the user is same or not
  if (id === currentUser) {
    res.status(403).json("User Request Forbidden! user cannot unfollow themselves");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUser);

      if (followUser.followers.includes(currentUser)) {
        await followUser.updateOne({ $pull: { followers: currentUser } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User Unfollowed Successfully");
      } else {
        res.status(403).json(" Already Unfollowed");
      }
    } catch (err) {
      res.status(403).json(err);
    }
  }
};
