import express, { Router } from "express";

import jwt from "express-jwt";
import jwks from "jwks-rsa"

import userRouter from "./users";
import campusRouter from "./campus";
import tokenBasedRouter from "./me";

const router:Router = express.Router();

router.use(jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://login.microsoftonline.com/common/discovery/keys'
  }),
  audience: 'fcb6143b-40b5-430b-bc51-bfd3e32556ef',
  issuer: 'https://login.microsoftonline.com/6fa69a93-be90-4d2c-a4eb-95e1cc558538/v2.0',
  algorithms: ['RS256']
}))
router.use("/users", userRouter);
router.use("/campus", campusRouter);
router.use("/me", tokenBasedRouter);

export default router;