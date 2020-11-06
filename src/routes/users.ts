//TODO: Get all MCC Users
//TODO: Create new user
//TODO: Get the current user
//TODO: Get specific user

import express, { Router } from "express";
import { getAllUsers } from "../drivers/graph";

const router:Router = express.Router();

router.get("/", async (req,res) => {
    const users = await getAllUsers();
    res.send(users);
})

export default router;