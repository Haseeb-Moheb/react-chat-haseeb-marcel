const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const Room = require("../models/room.model");
// const jwt = require('jsonwebtoken');

router.post("/", validateSession, async (req, res) => {
    
    try {
        const { name, description, user } = req.body;

        const room = new Room({
            name,
            description,
            user,
        });

        const newRoom = await room.save();
        // console.log(newRoom.name);

        newRoom
            ? res.status(200).json({
                  newRoom,
                  message: `${newRoom.name} was created.`,
              })
            : res.status(404).send(`Room was not created.`);
    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});
router.get("/", validateSession, async (req, res) => {
    try {
        const rooms = await Room.find();

        rooms
            ? res.status(200).json({
                  rooms,
              })
            : res.status(404).json({
                  message: "No rooms found.",
              });
    } catch (err) {
        res.status(500).json({
            Error: err.message,
        });
    }
});
        //TODO PATCH One
router.patch('/:id',validateSession, async (req, res) => {
    try {
        
        //1. Pull value from parameter
        // const { id } = req.params;
        const filter = {_id: req.params.id, owner_id: req.user._id}

        //2. Pull data from the body
        const info = req.body;
        //3. Use method to locate document off ID and pass in new info.
        const returnOption = {new: true};

        // const updated = await Room.findOneAndUpdate({_id: id}, info, returnOption);
        const updated = await Room.findOneAndUpdate(filter, info, returnOption);
        //* findOneAndUpdate(query, document, options);
        // returnOptions allow us to view the updated document right away.

        //4. Respond
        updated ?
            res.status(200).json({
                updated  
            }) :
            res.status(404).json({ 
                message: "Can not update this message."
            })

        } catch (err) {
          errorResponse(res, err);
    }
});
//TODO PATCH One
router.patch('/:id',validateSession, async (req, res) => {
try {
    
    //1. Pull value from parameter
    // const { id } = req.params;
    const filter = {_id: req.params.id, owner_id: req.user._id}

    //2. Pull data from the body
    const info = req.body;
    //3. Use method to locate document off ID and pass in new info.
    const returnOption = {new: true};

    // const updated = await Room.findOneAndUpdate({_id: id}, info, returnOption);
    const updated = await Room.findOneAndUpdate(filter, info, returnOption);
    //* findOneAndUpdate(query, document, options);
    // returnOptions allow us to view the updated document right away.

    //4. Respond
    updated ?
        res.status(200).json({
            updated  
        }) :
        res.status(404).json({ 
            message: "Can not update this room."
        })

    } catch (err) {
    errorResponse(res, err);
}
})
//TODO DELETE One
router.delete('/:id', validateSession, async (req, res) => {
    try {
        
        //1. Capture ID
        // const { id } = req.params;
        const filter = {_id: req.params.id, owner_id:req.user._id};

        //2. Use a delete method to locate and removes base off the ID
        const deleteRoom = await Room.deleteOne(filter);
        console.log(deleteRoom);

        //3. Response
        deleteRoom.deletedCount > 0 ?
            res.status(200).json({
                message: 'Room Removed'
            }) :
            res.status(404).json({
                message: 'Did not remove room.'
            }) 

    } catch (err) {
        errorResponse(res, err);
    }
})

module.exports = router;
