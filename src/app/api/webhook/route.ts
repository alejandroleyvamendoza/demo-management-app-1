import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


type ResponseData = {
    message: string
}

let appointmentState: any = {};

const { WEBHOOK_VERIFY_TOKEN, API_TOKEN, BUSINESS_PHONE, API_VERSION, PORT, BASE_URL } = process.env;

export async function GET(
    req: any,
    res: any
) {
    try {

        console.log('WEBHOOK_VERIFY_TOKEN', WEBHOOK_VERIFY_TOKEN)

        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge: any = req.query["hub.challenge"];

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

export async function POST(req: any, res: any) {

    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    const senderInfo = req.body.entry?.[0]?.changes[0]?.value?.contacts?.[0];


    if (message) {
        await handleIncomingMessage(message, senderInfo);
    }
    res.sendStatus(200);
}

async function handleIncomingMessage(message: any, senderInfo: any) {

    console.log('message', message);
    let fromNumber = '';
    if (message?.type === 'text') {
        const incomingMessage = message.text.body.toLowerCase().trim();

        fromNumber = message.from.slice(0, 2) + message.from.slice(3);

        console.log(':::::::::::::::::::::::', { incomingMessage, fromNumber, message, senderInfo });


        // if (!findClient(fromNumber)) {
        //     await this.createClient(senderInfo.profile.name, fromNumber);
        // }

        if (isGreeting(incomingMessage)) {
            await sendWelcomeMessage(fromNumber, message.id, senderInfo);
            await sendWelcomeMenu(fromNumber);
            // } else if (incomingMessage === 'media') {
            //     await sendMedia(fromNumber);
            // } else if (appointmentState[fromNumber]) {
            //     await handleAppointmentFlow(fromNumber, incomingMessage);
            // } else if (assistandState[fromNumber]) {
            //     await handleAssistandFlow(fromNumber, incomingMessage);
            // } else {
            //     await handleMenuOption(fromNumber, incomingMessage);
        }
        // await whatsappService.markAsRead(message.id);
    } else if (message?.type === 'interactive') {
        const option = message?.interactive?.button_reply?.id;
        fromNumber = message.from.slice(0, 2) + message.from.slice(3);

        await handleMenuOption(fromNumber, option);
        await markAsRead(message.id);
    }
}

function isGreeting(message: any) {

    console.log('type', message?.type === 'text');
    if (typeof message === 'string') {
        return true;
    }
}

async function sendWelcomeMessage(to: any, messageId: any, senderInfo: any) {
    const name = getSenderName(senderInfo);


    console.log("---------------------------- NAME", name, { to, messageId, senderInfo });

    const welcomeMessage = `Hola ${name}, Bienvenido a botwhatsapp.`;
    await sendMessage(to, welcomeMessage, messageId);
}

function getSenderName(senderInfo: any) {
    return senderInfo.profile?.name || senderInfo.wa_id;
}

async function sendMessage(to: any, body: any, messageId: any) {
    const data = {
        messaging_product: 'whatsapp',
        to,
        text: { body },
    };

    // console.log("TAG: CLASS WhatsAppService Method sendMessage");
    // console.log(JSON.stringify(data));


    await sendToWhatsApp(data);
}


const sendToWhatsApp = async (data: any) => {
    const baseUrl = `${BASE_URL}/${API_VERSION}/${BUSINESS_PHONE}/messages`;
    const headers = {
        Authorization: `Bearer ${API_TOKEN}`
    };

    try {
        const obj = {
            method: 'POST',
            url: baseUrl,
            headers: headers,
            data,
        }

        //console.log("TAG: obj", JSON.stringify(obj));
        const response = await axios(obj)

        //console.log("TAG: RESPONSE" + response.data);
        return response.data;
    } catch (error: any) {
        console.log(error.response.data);
    }
};

async function sendWelcomeMenu(to: any) {
    const menuMessage = "Elige una Opción"
    const buttons = [
        {
            type: 'reply', reply: { id: 'signup', title: 'Nombre' }
        },
        {
            type: 'reply', reply: { id: 'add_lastname', title: 'Apellido' }
        },
        {
            type: 'reply', reply: { id: 'add_adress', title: 'Colonia' }
        }
    ];

    await sendInteractiveButtons(to, menuMessage, buttons);
}

async function sendInteractiveButtons(to: any, bodyText: any, buttons: any) {
    const data = {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
            type: 'button',
            body: { text: bodyText },
            action: {
                buttons: buttons,
            },
        },
    };

    await sendToWhatsApp(data);
}

async function handleMenuOption(to: any, option: any) {
    let response;

    console.log('option', option);

    switch (option) {
        case 'signup':
            appointmentState[to] = { step: 'name' }
            response = "¿Cuál es tu nombre?:";
            break;
          case 'add_lastname':
            appointmentState[to] = { step: 'question' };
            response = "¿Cuál es tu apellido?:";
            break
        //   case 'add_adress':
        //     response = '¿Cuál es tu colonia?';
        //     await this.sendLocation(to);
        //     break
        //   case 'add_street':
        //     response = '¿Cuál es tu calle?';
        //     await this.sendContact(to);
        //     break
        default:
            response = "Lo siento, no entendí tu selección, Por Favor, elige una de las opciones del menú."
    }

    console.log({ to, response })
    await sendMessage(to, response, "");
}

async function markAsRead(messageId: any) {
    const data = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
    };

    console.log('mark as read');
    await sendToWhatsApp(data);
}