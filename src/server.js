const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const {connectToDB} = require("./config/db");

const authRouter = require("./routes/auth.routes");
const categoryRouter = require('./routes/category.routes');
const budgetRouter = require("./routes/budget.routes");


dotenv.config();

// Connect DB
connectToDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/budget", budgetRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
