import _ from 'lodash';
import twilio from 'twilio';
import twilioConfig from '../twilio-config';
const client = twilio(twilioConfig.SID, twilioConfig.TOKEN);
import {ICreateUser} from '../use-cases/create-user';

export default function makeCreateUserController({ createUser } : {createUser: ICreateUser}){
    return async function createUserController(httpRequest: {
        context: { validated: { query: string; } }
    }){
        try{
            const data = _.get(httpRequest, 'context.validated.data');
            const response = await client.verify.services(twilioConfig.SERVICE_ID)
                .verificationChecks.create({
                    to: `+${data.info.mobile_phone}`, 
                    code: data.code, 
            });
            if(!response.valid) {
                return {
                    headers: {"Content-Type": "application/json",},
                    statusCode: 404,
                    body: { data: null },
                }
            }
            const user = await createUser({payload: data.info})
            return {
                headers: {"Content-Type": "application/json",},
                statusCode: 200, 
                body: { data: user }
            }
        }catch(error) {
            return {
                headers: {"Content-Type": "application/json",},
                statusCode: 404,
                body: { data: null },
            }
        }
    };
}