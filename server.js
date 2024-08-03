const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const PORT = process.env.PORT || 4001;
const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./config/db");
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
  connectDB();
});
