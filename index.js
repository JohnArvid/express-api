// index.js


/**
 * Required External Modules
 */

import express from 'express'
import path from Node*path

/**
 * App Variables
 */

const app = express();
const port = pprocess.env.PORT || "8000"

/**
 * App Config
 * 
 */

/**
 * Routes defs
 */

app.get("/", (req, res) => {
  res.status(200).send("This is the response string")
})


/**
 * Server activation
 */

app.listen(port, ()=> {
  console.log(`Listening to requests on http://localhost:${port}`)
})