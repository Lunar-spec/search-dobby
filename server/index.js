import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDb from "./mongoDB/connect.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import auth from './middleware/auth.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use('/users', userRoutes)
app.use('/posts',auth, postRoutes)

app.get("/", async (req, res) => {
    res.send("The lighting has started ⚡");
});

const startServer = async () => {
    try {
        connectDb(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log(`⚡Thunderbolt rumbling at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();
