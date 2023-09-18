import Router from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../../models/User";
import authentication from "../../middleware/AuthenticationMiddleware";

import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env'});


const router = Router();

router.post('/register', async (req, res) => {
    const { username, email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if email is valid
    if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email" });

    // Check if any fields are empty
    if (!username || !email || !firstName || !lastName || !password || !confirmPassword) {
        return res.status(400).json({ message: "Invalid fields" });
    }
    // Check if user already exists
    const userExists = await User.exists({ email }).exec();
    if (userExists) return res.status(400).json({ message: "User already exists" });
    // Check if passwords match
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" });

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, firstName, lastName, password: hashedPassword });
        const saved = await newUser.save();
        if (!saved) return res.status(500).json({ message: "Error saving user" });

        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if any fields are empty
    if (!email || !password) return res.status(400).json({ message: "Invalid fields" });
    // Check if user exists
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).json({ message: "User does not exist" });
    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: "Password is incorrect" });

    // Create tokens
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1800s' }
    );
    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    // Save refreshToken to user in database
    user.refreshToken = refreshToken;
    await user.save();
    
    // Save token to cookies
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'None', secure: true });
    res.status(200).json({ accessToken });
});

router.post('/logout', async (req, res) => {
    const cookies = req.cookies;

    // Check if refreshToken is in cookies
    if (!cookies.refreshToken) res.status(204).json({ message: "No refreshToken found" });

    // Check if refreshToken is valid
    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) {
        res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(204).json({ message: "No user found" });
    }

    // Delete refreshToken from user in database and cookies
    user.refreshToken = null;
    await user.save();
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: "User logged out successfully" });
});

router.post('/refresh', async (req, res) => {
    const cookies = req.cookies;

    // Check if refreshToken is in cookies
    if (!cookies.refreshToken) return res.status(401).json({ message: "No authentication" });

    const refreshToken = cookies.refreshToken;
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) return res.status(403).json({ message: "No user found" });

    // Verify refreshToken
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decodedUser) => {
            if (error || user.id !== decodedUser.id) return res.status(403).json({ message: "Invalid refreshToken" });

            const accessToken = jwt.sign(
                { id: decodedUser.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1800s' }
            );

            return res.status(200).json({ accessToken });
        }
    )
});

router.get('/user', async (req, res) => {
    authentication(req, res, () => {
        const user = req.user;

        return res.status(200).json(user);
    });

});

module.exports = router;