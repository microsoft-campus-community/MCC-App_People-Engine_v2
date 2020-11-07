import express from "express";
import apiRouter from "./routes/router";

const app = express();

app.use("/api", apiRouter);


app.listen(process.env.PORT || 3001, () => {
    console.info("Server is running on Port 3001!");
})