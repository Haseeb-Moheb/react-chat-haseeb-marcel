    const router = require("express").Router();
    const Message = require("../models/message.model");
    const Room = require("../models/room.model");
    const { error, success, incomplete } = require("../helpers");
    const validateSession = require("../middleware/validate-session");

    router.post("/:chatRoom", async (req, res) => {
        try {
            const { user, room, body } = req.body;

            const { chatRoom } = req.params;
            console.log(chatRoom);

            const roomCheck = await Room.find({ _id: chatRoom });
            if (!roomCheck) throw new Error("No such room.");

            const message = new Message({
                when: new Date(),
                user,
                room,
                body,
            });
            const newMessage = await message.save();

            // Structure how we may want to save our message object for the room it is being assigned to.
            const forRoom = {
                id: newMessage._id,
                body: newMessage.body,
                date: newMessage.when,
            };

            await Room.findOneAndUpdate(
                { _id: chatRoom },
                { $push: { messages: forRoom } }
            );

            newMessage ? success(res, newMessage) : incomplete(res);
        } catch (err) {
            error(res, err);
        }
    });

    router.get("/all", validateSession, async (req, res) => {
        try {
            const messages = await Message.find();

        messages
            ? res.status(200).json({
                  messages,
              })
            : res.status(404).json({
                  message: "No messages found.",
              });
    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});

    module.exports = router;

