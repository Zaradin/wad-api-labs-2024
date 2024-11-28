import dotenv from "dotenv";
import express from "express";
import tasksRouter from "./api/tasks";
import "./db";

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use("/api/tasks", tasksRouter);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
