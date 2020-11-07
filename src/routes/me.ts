import express, { Router } from "express";
import { getUser, getUserCampus } from "../drivers/users";

const router:Router = express.Router();

router.get("/", async (req,res) => {
    if(!(req as any).user.oid) res.status(400).send("Token misses user identifier!");
    else res.send((await getUser((req as any).user.oid)))
});
router.get("/campus", async (req,res) => {
    if(!(req as any).user.oid) res.status(400).send("Token misses user identifier!");
    else res.send((await getUserCampus((req as any).user.oid)))
})

export default router;