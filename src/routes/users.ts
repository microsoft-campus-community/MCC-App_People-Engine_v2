//TODO: Get all MCC Users
//TODO: Create new user
//TODO: Get the current user
//TODO: Get specific user

import express, { Router } from "express";
import parser from "body-parser";
import { createUser, getAllUsers, getUser } from "../drivers/users";

const router:Router = express.Router();

router.get("/", async (req,res) => {
    res.send((await getAllUsers()));
})

router.get("/:userId", async (req,res) => {
    res.send((await getUser(req.params.userId)));
})
router.post("/", parser.json(), async (req,res) => {
    res.send(await createUser(req.body.firstName,req.body.lastName,req.body.mail,req.body.campusId))
})

export default router;