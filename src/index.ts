import express from "express";
import path from "path";
//@ts-ignore
import SwaggerSDK from "express-swagger-generator";
import apiRouter from "./routes/router";

const app = express();
const swagger = (SwaggerSDK as any)(app);

app.use("/api", apiRouter);

let swaggerOptions = {
    swaggerDefinition: {
        info: {
            description: 'People engine of the commasto app, used to interact with users and groups within the MCC tenant.',
            title: 'MCC People Engine',
            version: '1.0.0',
        },
        host: 'localhost:3001',
        basePath: '/api',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'Authorization',
                description: "The access token that you get after authenticating with the commasto app (fcb6143b-40b5-430b-bc51-bfd3e32556ef)."
            }
        }
    },
    basedir: path.join(__dirname, "..","src"), //app absolute path
    files: ['./routes/**/*.ts'] //Path to the API handle folder
};

swagger(swaggerOptions);
app.listen(process.env.PORT || 3001, () => {
    console.info("Server is running on Port 3001!");
})