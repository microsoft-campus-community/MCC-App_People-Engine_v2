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

/**
 * Get all MCC campus.
 * @route GET /campus
 * @group Campus
 * @operationId getCampus
 * @produces application/json
 * @returns {Array<Campus>} 200 - An array of campus objects
 * @security JWT
 */
router.get("/", async (req,res) => {
    res.send((await getAllCampus()).value);
})

/**
 * Get a specific campus.
 * @route GET /campus/:campusId
 * @group Campus
 * @operationId getCampus
 * @param {string} campusId - Group Id of a campus
 * @produces application/json
 * @returns {Campus.model} 200 - A campus object
 * @security JWT
 */
router.get("/:campusId", async (req,res) => {
    res.send ((await getCampus(req.params.campusId)));
})

/**
 * Get all members of a given campus.
 * @route GET /campus/:campusId/users
 * @group Campus
 * @operationId getCampus
 * @param {string} campusId - Group Id of a campus
 * @produces application/json
 * @returns {Array<User>} 200 - A campus object
 * @security JWT
 */
router.get("/:campusId/users", async (req,res) => {
    res.send((await getUsersByCampus(req.params.campusId)).value);
})

/**
 * Get the lead of a specific campus.
 * @route GET /campus/:campusId/lead
 * @group Campus
 * @operationId getCampus
 * @param {string} campusId - Group Id of a campus
 * @produces application/json
 * @returns {User.model} 200 - A campus object
 * @security JWT
 */
router.get("/:campusId/lead", async (req,res) => {
    res.send((await getCampusLead(req.params.campusId)))
})

export default router;