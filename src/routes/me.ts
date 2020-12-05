import express, { Router } from "express";
import { getUser, getUserCampus } from "../drivers/users";

const router:Router = express.Router();

/**
 * Get the user profile of the currently signed in user.
 * @route GET /me
 * @group Personal operations
 * @operationId meOps
 * @produces application/json
 * @returns {User.model} 200 - An user object
 * @security JWT
 */
router.get("/", async (req,res) => {
    if(!(req as any).user.oid) res.status(400).send("Token misses user identifier!");
    else res.send((await getUser((req as any).user.oid)))
});

/**
 * Get the campus of the currently signed in user.
 * @route GET /me/campus
 * @group Personal operations
 * @operationId meOps
 * @produces application/json
 * @returns {Campus.model} 200 - A campus object
 * @security JWT
 */
router.get("/campus", async (req,res) => {
    if(!(req as any).user.oid) res.status(400).send("Token misses user identifier!");
    else res.send((await getUserCampus((req as any).user.oid)))
})

export default router;