//TODO: Get all MCC Users
//TODO: Create new user
//TODO: Get the current user
//TODO: Get specific user

import express, { Router } from "express";
import parser from "body-parser";
import { createUser, deleteUser, getAllUsers, getUser, getUserCampus } from "../drivers/users";

const router:Router = express.Router();

router.get("/", async (req,res) => {
    res.send((await getAllUsers()));
})

router.get("/:userId", async (req,res) => {
    res.send((await getUser(req.params.userId)));
})
router.get("/:userId/campus", async (req,res) => {
    res.send((await getUserCampus(req.params.userId)));
})
router.post("/", parser.json(), async (req,res) => {
    res.send(await createUser(req.body.firstName,req.body.lastName,req.body.secondaryMail,req.body.campusId))
})
router.delete("/:userId", async (req,res) => {
    await deleteUser(req.params.userId);
    res.send();
})

export default router;