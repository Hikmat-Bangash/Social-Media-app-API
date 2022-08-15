import UserModel from "../Models/Users.js";
import bcrypt from 'bcrypt';

//==================== registering new user =================
export const RegisterUser = async (req,res)=>{
    const {username, firstname,lastname, password} = req.body;
// --------------- ENCRYPTION PASSWORD --------------
//   const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(password, 10);
  //-------------------------------------------
    const NewUser = new UserModel({username, firstname, lastname, password:hashpass});

    try{
        await NewUser.save();
        res.status(200).json(NewUser);
    }
    catch(err){
       res.status(500).json(err)
    }
}

// ============== FOR REGISTERED (LOGIN) USER ============
export const login = async (req,res)=>{
    const {username, password} = req.body;
    try{
          // checking if user username is matching or not
    const user = await UserModel.findOne({username: username});

    // checking if username is matching or not
    if(user){
        // after usename is matched then checking password
        const validity = password == user.password;
        validity ? res.status(200).json(user) : res.json("WRONG PASSWORD")
    }
    // if username is wrong
    else{
        res.json("Invalid user! please try again")
    }
    }
    catch(err){
         res.status(500).json(err);
    }
}