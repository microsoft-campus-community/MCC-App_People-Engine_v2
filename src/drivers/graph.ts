import fetch, { RequestInit } from "node-fetch";
import { URLSearchParams } from "url";
import config from "../config";




export async function query(database:string, method?:string, altHeaders?: {[key:string]:any}, payload?:{[key:string]:any}, token?:string) {
    if(!token) token = await getApplicationToken();
    let options:RequestInit = {
        method: method || "GET",
        headers: {
            "Authorization": "Bearer "+token
        }
    };
    if(payload) {
        options.body = JSON.stringify(payload);
        (options.headers as any)["Content-Type"] = "application/json";
    }
    if(altHeaders) {
        altHeaders["Authorization"] = "Bearer "+token;
        options.headers = altHeaders;
    }
    const request = await fetch("https://graph.microsoft.com/v1.0/"+database, options).catch(e => {
        console.error(e);
    })
    if(request) {
        try {
            const json = await request.json();
            return json;
        }
        catch(e) {return request.status;}
    } 
}

async function getApplicationToken():Promise<string> { 
    let formInput = new URLSearchParams;
    formInput.append("grant_type", "client_credentials");
    formInput.append("client_id", config.graphClientId);
    formInput.append("client_secret", config.graphClientSecret);
    formInput.append("scope", "https://graph.microsoft.com/.default");

    const request = await fetch("https://login.microsoftonline.com/" + config.graphTenant + "/oauth2/v2.0/token", {
        method: "POST",
        body: formInput
    }).catch(e => {
        throw e;
    });
    const json = await request.json();
    let token = json.access_token;
    return token;
}