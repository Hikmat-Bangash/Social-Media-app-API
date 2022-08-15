import Express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routing from './Routes/RegisterUsers.js' // routing component rendering
import Users from './Routes/Users.js'
import Posts from './Routes/PostsRoutes.js'

const app = Express();

//=============== FOR BODY-PARSER SECTION ===============
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// for .ENV SECTION
dotenv.config();


//============ for connecting to database ======================
mongoose
  .connect(process.env.DATABASE, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => console.log("connection established"))
  )
  .catch((err) => {
    console.log(err);
  });

  //================ Routing =========================
  app.use('/auth', routing);
  app.use('/user', Users);
  app.use('/post', Posts); 