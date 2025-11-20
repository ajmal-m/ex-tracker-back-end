const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


const {connectToDB} = require("./config/db");


dotenv.config();

// Connect DB
connectToDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
