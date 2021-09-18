import _ from 'lodash';
import { IGetUsers } from '../use-cases/get-uses';

export default function makeGetUsersController({ getUsers } : {getUsers: IGetUsers}){
    return async function getUsersController(httpRequest: {
        context: { validated: { query: string; } }
    }){
        try{
            const headers = { "Content-Type": "application/json", };
            const users = await getUsers()
            return {
                headers, 
                statusCode: 200, 
                body: {
                    data: users
                }
            }
        }catch(error) {
            throw {
                headers: {
                    "Content-Type": "application/json",
                },
                statusCode: 404,
                body: {
                    error: _.get(error, 'message')
                },
            }
        }
    };
}