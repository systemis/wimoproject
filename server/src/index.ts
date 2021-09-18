import _ from 'lodash';
import express, { Response, Request } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import makeDb from './data-access/make-db';
import userRouter from "./routers/api";
import { UserDb, AccountDB } from './data-access';
import twilioConfig from "./twilio-config";
import twilio from 'twilio';
import bcrypt from 'bcrypt'
const client = twilio(twilioConfig.SID, twilioConfig.TOKEN);

dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "10mb", strict: true }));
app.use(bodyParser.urlencoded({ extended: false })); // use queryString library
app.set("trust proxy", true); // Express sitting behind proxy
app.use(cors())
app.use("/api", userRouter);

makeDb().then(async() => {
  const user = await UserDb.findByEmail({email: 'systemofpeter@gmail.com'});
  if(!user) {
    console.log('making user');
    await UserDb.insert({
      first_name: 'dragon2 ', 
      last_name: 'pham', 
      mobile_phone: '090002', 
      email: 'systemofpeter@gmail.com'
    });
  }

  const account_list = await AccountDB.findAll()
  if(!_.size(account_list)) {
    let password = await bcrypt.hash('Profile', bcrypt.genSaltSync(10))
    console.log(password)
    await AccountDB.insert({
      email: 'tphamdn@gmail.com', 
      name: 'Pham Van Thinh', 
      password: password, 
      posts: [], 
    })

    console.log('create new account successfully')
  }
}).catch((err) => console.error("error when create db: ", err))

async function create(){
  const phone_number: string = "+840905631878"
  console.log(phone_number)
  const response = await client.verify.services(twilioConfig.SERVICE_ID)
      .verifications.create({
          to: `+${phone_number}`, 
          channel: 'sms'
      });
  console.log(response)
}

async function vertify(code:string) {
  const phone_number: string = "+84905631878"
  console.log(phone_number)
  const response = await client.verify.services(twilioConfig.SERVICE_ID)
      .verificationChecks.create({
          to: `+${phone_number}`, 
          code: code, 
          // statusCallback: 'http://postb.in/1234abcd'
      });
  console.log(response)
}

const PORT = process.env.port || 3290;
app.listen(PORT, async () => { 
  console.log(`server is listening on port ${PORT}`);
  // create()
  // vertify("078591");
});
