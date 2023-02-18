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

router.patch("/:id", validateSession, async (req, res) => {
    try {
        //1. Pull value from parameter
        // const { id } = req.params;
        const filter = { _id: req.params.id, owner_id: req.user._id };

        //2. Pull data from the body
        const info = req.body;
        //3. Use method to locate document off ID and pass in new info.
        const returnOption = { new: true };

        // const updated = await Movie.findOneAndUpdate({_id: id}, info, returnOption);
        const updated = await Message.findOneAndUpdate(
            filter,
            info,
            returnOption
        );
        //* findOneAndUpdate(query, document, options);
        // returnOptions allow us to view the updated document right away.

        //4. Respond
        updated
            ? res.status(200).json({
                  updated,
              })
            : res.status(404).json({
                  message: "Can not update this message.",
              });
    } catch (err) {
        error(res, err);
    }
});

router.delete("/:id", validateSession, async (req, res) => {
    try {
        //1. Capture ID
        // const { id } = req.params;
        const filter = { _id: req.params.id, owner_id: req.user._id };

        //2. Use a delete method to locate and removes base off the ID
        const deleteMessage = await Message.deleteOne(filter);

        //3. Response

        deleteMessage.deletedCount > 0
            ? res.status(200).json({
                  message: "Message removed",
              })
            : res.status(404).json({
                  message: "Did not remove message.",
              });
    } catch (err) {
        error(res, err);
    }
});

module.exports = router;

// {
//     "when": "2018-07-15T20:00:47.696Z",
//     "user": "John",
//     "room": "Main",
//     "body": "I really want to attend NASA's DEVELOP program this summer!"
// }
