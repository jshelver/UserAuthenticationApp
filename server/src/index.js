import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import corsOptions from './config/cors';
import credentials from './middleware/Credentials';
import errorHandlerMiddleware from './middleware/ErrorHandler';


// Load .env file
dotenv.config({ path: '../.env'});

// Express app setup
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors(corsOptions));
// Validate credentials
app.use(credentials);
// Default error handler
app.use(errorHandlerMiddleware);


// Connect to cloud MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'user-auth-test'
    })
    .then(() => console.log('MongoDB database Connected...'))
    .catch((err) => console.log(err));

// Import routes
import Authentication from './routes/api/Authentication';
app.use('/api/auth', Authentication);

// Error handler for all other routes
app.all('*', (req, res) => {
    res.status(404).json({ message: 'Page not found' });
});


// Start the server
mongoose.connection.once('open', () => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening on port ${process.env.PORT}`);
    });
});