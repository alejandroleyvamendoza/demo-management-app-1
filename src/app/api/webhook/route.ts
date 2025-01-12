import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


type ResponseData = {
    message: string
}

const { WEBHOOK_VERIFY_TOKEN, API_TOKEN, BUSINESS_PHONE, API_VERSION, PORT } = process.env;

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {

        console.log('WEBHOOK_VERIFY_TOKEN', WEBHOOK_VERIFY_TOKEN)

        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];
    
        // check the mode and token sent are correct
        if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
            // respond with 200 OK and challenge token from the request
            res.status(200).send(challenge);
            console.log("Webhook verified successfully!");
        } else {
            // respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
        
    } catch (error) {
        console.error('ERROR!!!!!', error)
    }

}