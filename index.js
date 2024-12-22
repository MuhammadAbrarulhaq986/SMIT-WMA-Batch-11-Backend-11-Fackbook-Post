import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./src/db/index.js";
import postRoute from "./src/routes/post.routes.js";
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//routes
app.use("/api/v1", postRoute);

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO DB connection failed !!! ", err);
    });