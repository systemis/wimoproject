import { UserDb } from "../data-access";
import makeGetUsers from "./get-uses";
import makeCreateUser from "./create-user";

const getUsers = makeGetUsers(UserDb);
const createUser = makeCreateUser(UserDb);
export {
    getUsers, 
    createUser, 
};