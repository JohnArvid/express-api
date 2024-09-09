// index.js


/**
 * Required External Modules
 */

import express from 'express'
import path, { dirname } from 'node:path'
import url from 'node:url';
import { title } from 'node:process';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000"

/**
 * App Config
 * 
 */

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))

/**
 * Routes defs
 */

app.get("/", (req, res) => {
  res.render("index", {title:"Home"})
})


/**
 * Server activation
 */

app.listen(port, ()=> {
  console.log(`Listening to requests on http://localhost:${port}`)
})