import config from "../config";
import { getCampusLead } from "./campus";
import { query } from "./graph";
import { renderMail } from "./renderWelcomeEmail";

export function normalize(str: string) {
    const umlautMap: { [key: string]: string } = {
        '\u00dc': 'UE',
        '\u00c4': 'AE',
        '\u00d6': 'OE',
        '\u00fc': 'ue',
        '\u00e4': 'ae',
        '\u00f6': 'oe',
        '\u00df': 'ss',
    }
    let standard =  str
        .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
            const big = umlautMap[a.slice(0, 1)];
            return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
        })
        .replace(new RegExp('[' + Object.keys(umlautMap).join('|') + ']', "g"),
            (a) => umlautMap[a]
        );
        standard = (standard as any).replaceAll(" ",".");
        return standard;
}

export function generatePassword(): string {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 22; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function sendUserCreationMessage(leadName:string, leadMail:string, password: string, principalMail:string, alternateMail:string) {
    const message = await query("/users/"+config.mailsender+"/messages", "POST", undefined, {
        "subject":"Welcome to the Microsoft Campus Community!",
        "body":{
            "contentType":"HTML",
            "content": renderMail(principalMail,password,leadName,leadMail)
        },
        "toRecipients":[
            {
                "emailAddress":{
                    "address": alternateMail
                }
            }
        ]
    
    });
    if ((await query("/users/"+config.mailsender+"/messages/"+message.id+"/send", "POST", {"Content-Length": 0})) === 202) return;
    else console.error("Email could not be sent! User is not notified of new account!");
}