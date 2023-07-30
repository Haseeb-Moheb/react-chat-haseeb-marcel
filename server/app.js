require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require('cors');
const bodyParser = require("body-parser");

const userController = require("./controllers/user.controller")
const roomController = require("./controllers/room.controller");
const messageController = require("./controllers/message.controller");
const validateSession = require("./middleware/validate-session");

const mongoose = require("mongoose");
const DBURL = process.env.DBURL;

mongoose.connect(`${DBURL}/chat`);

const db = mongoose.connection;

db.once("open", () => console.log(`Connected: ${DBURL}`));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
// router.use(bodyParser.json());

app.use("/user", userController);
app.use(validateSession);
app.use("/room", roomController);
app.use("/message", messageController);

app.listen(PORT, () => console.log(`Chat is running on port: ${PORT}`));
