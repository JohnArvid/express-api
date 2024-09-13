// auth.js

/**
 * Required External Modules
 */

import {Router} from "express"
const router = Router()
import passport from "passport"
import queryString from "querystring"
import dotenv from "dotenv"

dotenv.config()

/**
 * Routes Definitions
 */
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile"
  }),
  (req, res) => {
    res.redirect("/")
  }

)

router.get("/callback", (req, res, next) => {
  
})

/**
 * Module Exports
 */