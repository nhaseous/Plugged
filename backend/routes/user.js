const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const request = require('request');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

const config = {
    client_id:'9ca4892b7c5446d7a6c61de891193379',
    client_secret: '699f0e6c4f8d48278fec738a88f5ba1b',
    scope: 'user-top-read streaming'
};

router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar,
                                email: user.email
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

router.post('/edit', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                          user.name = name;
                          user
                            .save()
                            .then(user => {
                                res.json(user)
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});

/**
 * Ensures that the redirect is actually from spotify servers by checking random state stored in session storage
 *  against what should be returned by Spotify servers.
 * @param goodState state passed back within params of the spotify call
 * @param state state saved in session storage as validation
 * @returns {Promise<any>}
 */
const checkState = (goodState, state) => {
    return new Promise((resolve, reject) => {
        if (goodState !== state) {
            reject({
                error:
                    "Invalid state - Log out and in again before linking with Spotify."
            });
        } else resolve();
    });
};

/**
 * Checks the access code from client against the Spotify database
 * @param code provided from within the params of the spotify redirect
 * @returns {Promise<any>} the access token that validates a user to use access data held by spotify
 */
const checkCode = code => {
    return new Promise((resolve, reject) => {
        request.post(
            {
                url: `https://accounts.spotify.com/api/token`,
                headers: {
                    "User-Agent": "request",
                    Accept: "application/json"
                },
                formData: {
                    code: code,
                    grant_type: 'authorization_code',
                    redirect_uri: 'localhost:5000/auth/spotify',
                    client_id: config.client_id,
                    client_secret: config.client_secret
                }
            },
            (err, res, body) => {
                if (err) reject(err);
                if (body.error) reject(body);
                else resolve(JSON.parse(body));
            }
        );
    });
};

/**
 * Uses the newly begotten access token to fetch a Spotify user object
 * @param accessToken the access token received previously
 * @returns {Promise<any>} the full user object containing email, display_name, spotify id, & more
 */
const checkSpotifyInfo = accessToken => {
    return new Promise((resolve, reject) => {
        request.post(
            {
                url: "https://api.spotify.com/v1/me",
                headers: {
                    "User-Agent": "request",
                    Authorization: `token ${accessToken}`
                },
            },
            (err, res, body) => {
                if (err) reject(err);
                else resolve(JSON.parse(body));
            }
        );
    });
};

/**
 * In order to sso into Plugged a get must be sent to '/ssoauth' which redirects to spotify to handle
 */
router.get("/ssoauth", (req, res) => {
    // Redirect to Github login with client_id, state and scope
    req.session.state = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 10);
    const spotPath =
        `https://accounts.spotify.com/authorize?` +
        `redirect_uri=localhost:5000/auth/spotify&` +
        `scope=${config.scope}&` +
        `client_id=${config.client_id}&` +
        `state=${req.session.state}&`+
        `response_type=code`;
    console.log(`Sending users to: ${spotPath}`);
    res.redirect(spotPath);
});

/**
 * This is where Spotify will reroute a client if they sucessfully log in to Spotify and if validations pass
 * (checkState, checkCode, checkSpotifyInfo) then the mongodb database will be searched for a user. If said user
 * doesn't exist the Spotify user object will be used to fill and create a user
 */
router.get("/auth/spotify", async (req, res) => {
    console.log("Hello motherfucker");
    // Must have a temp code from GH
    if (!req.query.code)
        return res.status(400).send({ error: "Code field required" });
    // Must have state token too
    if (!req.query.state)
        return res.status(400).send({ error: "State field required" });
    // Validate state
    try {
        // Is this a valid GH response
        await checkState(req.session.state, req.query.state);
        // Convert code to token and scope
        const { access_token } = await checkCode(req.query.code);
        // Get GH username
        const { login } = await checkSpotifyInfo(access_token);
        console.log(`Fetched Spotify user: ${login.display_name}`);
        // Save the login and token to the session for future use
        req.session.user = { login: login.display_name, token: access_token };

        console.log(login);

        // Search database for user
        app.models.User.findOne({ username: login.display_name }, async (err, user) => {
            // If not found, return 401:unauthorized
            if (err) res.status(500).send({ error: "internal server error" });
            else if (!user) {
                let model = {
                    username: login.display_name,
                    primary_email: login.email,
                    password: login.id
                };



                let newUser = new User(model);

                await newUser.save();

                req.session.regenerate(() => {
                    req.session.user = user;
                    console.log(
                        `Session.login success: ${req.session.user.username}`
                    );
                    // If a match, return 201:{ username, primary_email }
                    res.redirect("/profile");
                });

                res.redirect("/profile");
            }
            // If found, compare hashed passwords
            else {
                // Regenerate session when signing in to prevent fixation
                req.session.regenerate(() => {
                    req.session.user = user;
                    console.log(
                        `Session.login success: ${req.session.user.username}`
                    );
                    // If a match, return 201:{ username, primary_email }
                    res.redirect("/profile");
                });
            }
        });

    } catch (err) {
        console.log(err);
        // Send user to error page explaining what happened
        res.status(400).send(err);
    }
});
module.exports = router;
