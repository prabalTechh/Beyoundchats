import express from 'express' 
import User from "./User"

const mainRouter = express.Router();

mainRouter.use("/user" , User)


export default mainRouter