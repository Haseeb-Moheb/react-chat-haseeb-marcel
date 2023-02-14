const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Room = require("../models/room.model");
const jwt = require("jsonwebtoken");

router.post("/room", validateSession),
    async (req, res) => {
        try {
            const { name, description, addedUsers } = req.body;

            const room = new Room({
                name,
                description,
                addedUsers,
            });

            const newRoom = await room.save();

            newRoom
                ? res.status(200).json({
                      newRoom,
                      message: `${newRoom.title} was created.`,
                  })
                : res.status(404).send(`Room was not created.`);
        } catch (err) {
            res.status(500).json({
                Error: err.message,
            });
        }
    };

module.exports = router;
