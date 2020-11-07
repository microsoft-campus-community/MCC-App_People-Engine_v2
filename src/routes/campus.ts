//TODO: Get all campus
//TODO: Get all campus for a hub
//TODO: Create Campus
//TODO: Get users campus
//TODO: Get specific campus
//TODO: Delete campus
//TODO: Get campus users
//TODO: Change campus lead

import express, { Router } from "express";
import { getAllCampus, getCampus, getCampusLead } from "../drivers/campus";
import { getUsersByCampus } from "../drivers/users";

const router:Router = express.Router();

router.get("/", async (req,res) => {
    res.send((await getAllCampus()).value);
})
router.get("/:campusId", async (req,res) => {
    res.send ((await getCampus(req.params.campusId)));
})
router.get("/:campusId/users", async (req,res) => {
    res.send((await getUsersByCampus(req.params.campusId)).value);
})
router.get("/:campusId/lead", async (req,res) => {
    res.send((await getCampusLead(req.params.campusId)))
})

export default router;