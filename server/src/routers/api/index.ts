import express from 'express';
import makeExpressCallback from "../../express-callback/index";
import { 
    getUsersController, 
    createUserController, 
    sendVertificationController } from '../../controllers';
const userRouter = express.Router();
userRouter.get(
    '/', 
    makeExpressCallback(getUsersController)
); // Get users information list 

userRouter.post(
    '/', 
    makeExpressCallback(createUserController)
); // Get users information list 

userRouter.post(
    '/sms-vertification/', 
    makeExpressCallback(sendVertificationController)
);

export default userRouter; 