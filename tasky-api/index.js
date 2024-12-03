import dotenv from "dotenv";
import express from "express";
import tasksRouter from "./api/tasks";
import usersRouter from "./api/users";
import "./db";
import cors from "cors";

dotenv.config();

/* eslint-disable */
const errHandler = (err, req, res, next) => {
    // eslint-disable-line

    /* if the error in development then send stack trace to display whole error,
    if it's in production then just send error message  */
    if (process.env.NODE_ENV === "production") {
        return res.status(500).send(`Something went wrong!`);
    }
    res.status(500).send(
        `Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `
    );
};

const app = express();
app.use(express.json());
// Enable CORS for all requests
app.use(cors());

const port = process.env.PORT;

app.use("/api/tasks", tasksRouter);

app.use("/api/users", usersRouter);

app.use(errHandler);

app.listen(port, () => {
    console.info(`Server running at ${port}`);
});
