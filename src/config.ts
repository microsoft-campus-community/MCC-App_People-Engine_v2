import dotenv from "dotenv";
import { _Config } from "./models/_Config";
dotenv.config();

let config:_Config = {
    graphClientId: "", graphClientSecret: "", graphTenant: "", mailsender: ""
}

config.graphClientId = process.env.CLIENTID || "";
config.graphClientSecret = process.env.CLIENTSECRET || "";
config.graphTenant = process.env.TENANT || "";
config.mailsender = process.env.MAILUSERID || ""

if(config.graphClientId === "" || config.graphClientSecret === "" || config.graphTenant === "" || config.mailsender === "") throw "Configuration incomplete!";

export default config;