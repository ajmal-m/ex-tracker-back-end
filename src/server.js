const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));



app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
