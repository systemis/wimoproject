import mongoose from 'mongoose';
import {
    getUsers, 
    createUser
} from '../use-cases/';
import makeGetUsersController from './get-user';
import makeCreateUserController from './create-user';
import makeSendVertificationController from './send-vertification';

const getUsersController = makeGetUsersController({getUsers});
const createUserController = makeCreateUserController({createUser});
const sendVertificationController = makeSendVertificationController();


export {
    getUsersController, 
    createUserController, 
    sendVertificationController, 
}