import jwt from "jsonwebtoken";
import User from "../models/User";

import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env'});


function authentication(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if authorization header exists
    if (authHeader?.startsWith('Bearer')) {
        const token = authHeader.split(' ')[1];


        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decodedUser) => {
            // Check for errors
            if (err) {
                req.user = {};
                return next();
            }
            
            // Find user in database and attach to request object
            const user = await User.findById(decodedUser.id).select({ password: 0, refreshToken: 0 }).exec();
            if (user) {
                console.log(user);
                req.user = user.toObject({ getters: true });
            } else {
                req.user = {};
            }

            return next();
        });
    } else {
        req.user = {};
        return next();
    }
}

module.exports = authentication;