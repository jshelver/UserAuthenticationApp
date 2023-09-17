import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// Load .env file
dotenv.config({ path: '../.env'});

const app = express();
app.use(bodyParser.json());

// Connect to cloud MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'ecommerce'
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err));

// TO-DO: Import routes

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});