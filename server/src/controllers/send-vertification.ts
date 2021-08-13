import _, { conformsTo } from 'lodash';
import twilioConfig from '../twilio-config';
import twilio from 'twilio';
const client = twilio(twilioConfig.SID, twilioConfig.TOKEN);

export default function makeSendVertificationController(){
    return async function sendVertificationController(httpRequest: {
        context: { validated: { query: string; } }
    }){
        
        try {
            const phone_number: string = _.get(httpRequest, 'context.validated.phone_number');
            console.log(`number phone: +${phone_number}`);
            const response = await client.verify.services(twilioConfig.SERVICE_ID)
                .verifications.create({
                    to: `+${phone_number}`, 
                    channel: 'sms'
                });
            console.log('sending response', response);
            return {
                headers: { "Content-Type": "application/json", }, 
                statusCode: 200, 
                body: {
                    data: response
                }
            }
        }catch(error){
            console.log(error)
            return {
                headers: {"Content-Type": "application/json",},
                statusCode: 404,
                body: { data: null },
            }
        }
    }
}