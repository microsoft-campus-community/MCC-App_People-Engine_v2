import dotenv from "dotenv";
import { _Config } from "./models/_Config";
dotenv.config();

let config:_Config = {
    graphClientId: "", graphClientSecret: "", graphTenant: ""
}

config.graphClientId = process.env.CLIENTID || "";
config.graphClientSecret = process.env.CLIENTSECRET || "";
config.graphTenant = process.env.TENANT || "";

if(config.graphClientId === "" || config.graphClientSecret === "" || config.graphTenant === "") throw "Configuration incomplete!";

export default config;