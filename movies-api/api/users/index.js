import express from "express";
import User from "./userModel";

const router = express.Router(); // eslint-disable-line

// Get all users
// eslint-disable
router.get("/", async (req, res) => {
    // eslint-disable-line
    const users = await User.find();
    res.status(200).json(users);
});

// register(Create)/Authenticate User
// register(Create)/Authenticate User
router.post("/", async (req, res) => {
    try {
        if (req.query.action === "register") {
            // If action is 'register', save to DB
            const newUser = new User(req.body);
            await newUser.save();
            return res.status(201).json({
                code: 201,
                msg: "Successfully created new user.",
            });
        } else {
            // Authenticate user: query the DB and check if there's a match
            const user = await User.findOne(req.body);
            if (!user) {
                return res.status(401).json({
                    code: 401,
                    msg: "Authentication failed",
                });
            } else {
                return res.status(200).json({
                    code: 200,
                    msg: "Authentication Successful",
                    token: "TEMPORARY_TOKEN",
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            code: 400,
            msg: "An error occurred",
            error: error.message,
        });
    }
});

// Update a user
router.put("/:id", async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne(
        {
            _id: req.params.id,
        },
        req.body
    );
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: "User Updated Sucessfully" });
    } else {
        res.status(404).json({ code: 404, msg: "Unable to Update User" });
    }
});

export default router;