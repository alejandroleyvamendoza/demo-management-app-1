import { parse } from 'url';
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';



type ResponseData = {
    message: string
}

let appointmentState: any = {};
const prisma = new PrismaClient();

const { WEBHOOK_VERIFY_TOKEN, API_TOKEN, BUSINESS_PHONE, API_VERSION, PORT, BASE_URL } = process.env;

async function findClient(fromNumber: string) {
    const user = await prisma.client.findUnique({
        where: {
            wa_id: fromNumber,
        },
    });

    return user;
}

async function createClient(name: string, wa_id: string) {
    const client = await prisma.client.create({
        data: {
            name: name + '😂​😂​😂​😂​',
            wa_id,
        },
    });
}

export async function GET(req: Request) {
    try {
        const parsedUrl = parse(req.url, true); // Analiza la URL con query params
        const queryParams = parsedUrl.query; // Obtén los query params como un objeto


        const mode = queryParams["hub.mode"];
        const token = queryParams["hub.verify_token"];
        const challenge: any = queryParams["hub.challenge"];

        if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
            return new Response(challenge);
        } else {
            // respond with '403 Forbidden' if verify tokens do not match
            return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
        }

    } catch (error) {
        console.error('Error: WebHook - GET - ', error);
        throw new Error('Error: WebHook - GET - ' + error);
    }

}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const message = body.entry?.[0]?.changes[0]?.value?.messages?.[0];
        const senderInfo = body.entry?.[0]?.changes[0]?.value?.contacts?.[0];

        if (message) {
            await handleIncomingMessage(message, senderInfo);
        }

        return Response.json({ success: true });

    } catch (error) {
        console.error('Error: WebHook - POST - ', error);
        throw new Error('Error: WebHook - POST - ' + error);
    }
}

async function handleIncomingMessage(message: any, senderInfo: any) {

    let fromNumber = '';
    if (message?.type === 'text') {
        const incomingMessage = message.text.body.toLowerCase().trim();

        fromNumber = message.from.slice(0, 2) + message.from.slice(3);

        const client = await findClient(fromNumber);

        if (client == null) {
            const response = await createClient(senderInfo.profile.name, fromNumber);
        }

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
    if (typeof message === 'string') {
        return true;
    }
}

async function sendWelcomeMessage(to: any, messageId: any, senderInfo: any) {



    const name = getSenderName(senderInfo);
    const welcomeMessage = `Hola ${name}, Bienvenido a botwhatsapp.`;
    await sendMessage(to, welcomeMessage, messageId);
}

function getSenderName(senderInfo: any) {
    return senderInfo.profile?.name || senderInfo.wa_id;
}

async function sendMessage(to: any, body: any, messageId: any) {
    // const data = {
    //     messaging_product: 'whatsapp',
    //     to,
    //     type: 'template',
    //     template: { // This is now a proper JSON object
    //         name: "hello_world",
    //         language: {
    //             code: "en_US"
    //         },
    //     }
    // };

    const data = {
        messaging_product: 'whatsapp',
        to,
        text: { body },
    };





    await sendToWhatsApp(data);
}


const sendToWhatsApp = async (data: any) => {
    const baseUrl = `${BASE_URL}/${API_VERSION}/${BUSINESS_PHONE}/messages`;
    const headers = {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
    };

    try {
        const obj = {
            method: 'POST',
            url: baseUrl,
            headers: headers,
            data,
        }



        const response = await fetch(baseUrl, { method: 'POST', body: JSON.stringify(data), headers, })

        return response;
    } catch (error: any) {
    }
};

async function sendWelcomeMenu(to: any) {
    const menuMessage = "Elige una Opción"
    const buttons = [
        {
            type: 'reply', reply: { id: 'signup', title: 'Nombre completo' }
        },
        {
            type: 'reply', reply: { id: 'add_lastname', title: 'CURP' }
        },
        // {
        //     type: 'reply', reply: { id: 'add_adress', title: 'Colonia' }
        // }
    ];

    await sendInteractiveButtons(to, menuMessage, buttons);
}

async function sendInteractiveButtons(to: any, bodyText: any, buttons: any) {
    const data = {
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        "recipient_type": "individual", // Important for sending to individuals
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

    await sendMessage(to, response, "");
}

async function markAsRead(messageId: any) {
    const data = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId,
    };

    await sendToWhatsApp(data);
}