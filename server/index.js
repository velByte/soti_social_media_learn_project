import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import postRouts from './routes/posts.js';
import { createPost } from './controllers/post.js';
import { register } from './controllers/auth.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/user.js';
import Post from './models/post.js';
import { users, posts } from './data/index.js';


/* CONFIGURATIONS and Middleware*/
const __filename = fileURLToPath(import.meta.url); // This is the path to the file
const __dirname = path.dirname(__filename); // This is the path to the directory
dotenv.config(); // This is the dotenv package
const app = express(); // This is the express package
app.use(express.json()); // This is the body-parser package
app.use(helmet()); // This is the helmet package
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' })); // This is the helmet package
app.use(morgan('common')); // This is the morgan package
app.use(bodyParser.json({ limit: '30mb', extended: true })); // Set the limit of the body-parser package
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })); // Set the limit of the body-parser package
app.use(cors()); // This is the cors package
/* Serving the assets folder. 
Set the directory of where we are holding the assets folder
We're going to store the assets Images locally. 
In real live production app we would want to store it in an actual storage file directory or cloud storage like S3*/
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/** FILE STORAGE */
/*Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 
  It is written on top of busboy for maximum efficiency. 
  Anytime we want to upload a file we're going to use this package.
  */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/**
 Routs with FILES
 */

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postRouts);

// Serve static assets if in production

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}

/* DATA BASE */
const PORT = process.env.PORT || 6001;



mongoose.set('strictQuery', false); //DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message, "error");
}); // This is the mongoose package

