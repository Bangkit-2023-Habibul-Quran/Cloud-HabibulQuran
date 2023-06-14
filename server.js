const mongoose = require("mongoose");
const express = require("express");
const app = express();

const router = require("./router");
app.use("/", router);

try {
  // mongoose.connect("mongodb+srv://Habibul:bismillahdehbisa096@cluster0.aqxlhwl.mongodb.net/?retryWrites=true&w=majority");
  mongoose.connect(
    "mongodb://myUserAdmin:capstoneHabib23@34.128.66.104:27017/?authMechanism=DEFAULT&authSource=admin"
  );
  console.log("Database Connected");
} catch (error) {
  console.error(error);
}

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log("Server running at port:", port);
});
