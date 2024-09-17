// index.js

/**
 * Required External Modules
 */

import express from 'express';
import path, { dirname } from 'node:path';

import url from 'node:url';
import { title } from 'node:process';

import expressSession from 'express-session';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

import dotenv from 'dotenv';

dotenv.config();

import { router as authRouter } from './auth.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || '8000';

/**
 * Session config
 */

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: false,
};

if (app.get('env') === 'production') {
  // Serve secure cookies, requires HTTPS
  session.cookie.secure = true;
}

/**
 * Passport config
 */

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    return done(null, profile);
  }
);

/**
 * App Config
 *
 */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession(session));

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});


// Create cusom middleware with Express
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})

// Mount router
app.use("/", authRouter)

/**
 * Routes defs
 */
// second parameter of res.render() is used to pass data from controller to template
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/user', (req, res) => {
  res.render('user', { tilte: 'Profile', userProfile: { nickname: 'Auth0' } });
});

/**
 * Server activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
