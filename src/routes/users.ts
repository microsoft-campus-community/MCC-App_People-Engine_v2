//TODO: Get all MCC Users
//TODO: Create new user
//TODO: Get the current user
//TODO: Get specific user

import express, { Router } from "express";
import parser from "body-parser";
import { createUser, deleteUser, getAllUsers, getUser, getUserCampus } from "../drivers/users";

const router:Router = express.Router();
/**
 * @typedef User
 * @property {boolean} accountEnabled
 * @property {string} city
 * @property {string} displayName
 * @property {string} id
 * @property {string} jobTitle
 * @property {string} mail
 * @property {string} hireDate - Timestamp the user account was created.
 * @property {boolean} isAdmin - Indicator if the user is an administrator, only included if true.
 * @property {boolean} isLead - Indicator if the user is a lead, only included if true.
 */

 /**
 * @typedef Campus
 * @property {string} id
 * @property {string} displayName
 * @property {string} mail
 */


/**
 * Get all (member) users in the MCC tenant, excluding guest users.
 * @route GET /users
 * @group Users - Member operations
 * @operationId getAllUser
 * @produces application/json
 * @returns {Array.<User>} 200 - An array of user info
 * @security JWT
 */
router.get("/", async (req,res) => {
    res.send((await getAllUsers()));
})

/**
 * Get a specific MCC user by ID.
 * @route GET /users/:userId
 * @group Users - Member operations
 * @operationId getUser
 * @param {string} userId - Azure Active Directory ID of an user
 * @produces application/json
 * @returns {User.model} 200 - A user object
 * @security JWT
 */
router.get("/:userId", async (req,res) => {
    res.send((await getUser(req.params.userId)));
})
/**
 * Get the campus of a specific user.
 * @route GET /users/:userId/campus
 * @group Users - Member operations
 * @operationId getUserCampus
 * @param {string} userId - Azure Active Directory ID of an user
 * @produces application/json
 * @returns {Campus.model} 200 - A campus object
 * @security JWT
 */
router.get("/:userId/campus", async (req,res) => {
    res.send((await getUserCampus(req.params.userId)));
})
/**
 * Create a new MCC member, license them and add them to the right campus.
 * @route POST /users/
 * @group Users - Member operations
 * @operationId postUser
 * @param {string} firstName - First name of the new member.
 * @param {string} lastName - Last name of the new member.
 * @param {string} secondaryMail - Alternative email of the new member to which the welcome email will be sent.
 * @param {string} campusId - ID of the campus the user should be listed in.
 * @produces application/json
 * @returns {User.model} 200 - A campus object
 * @security JWT
 */
router.post("/", parser.json(), async (req,res) => {
    res.send(await createUser(req.body.firstName,req.body.lastName,req.body.secondaryMail,req.body.campusId))
})
/**
 * Delete a specific user.
 * @route DELETE /users/:userId
 * @group Users - Member operations
 * @operationId deleteUser
 * @param {string} userId - Azure Active Directory ID of an user
 * @produces application/json
 * @returns  200
 * @security JWT
 */
router.delete("/:userId", async (req,res) => {
    await deleteUser(req.params.userId);
    res.send();
})

export default router;