const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const {connectToDB} = require("./config/db");

const authRouter = require("./routes/auth.routes");
const categoryRouter = require('./routes/category.routes');
const budgetRouter = require("./routes/budget.routes");
const expenseRouter = require('./routes/expense.routes');
const reportRouter = require('./routes/report.routes');
const userRouter = require("./routes/user.routes");


dotenv.config();

// Connect DB
connectToDB();

const app = express();

// Middlewares
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,                 
  }
));
app.use(express.json());
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/report", reportRouter);
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
