import express from 'express' 
import User from "./User"
import Scrape from "./Scrape"

const mainRouter = express.Router();

mainRouter.use("/user" , User)
mainRouter.use("/data" , Scrape)


export default mainRouter