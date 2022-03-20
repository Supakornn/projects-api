require("dotenv").config();
require("express-async-errors");
const express = require("express");
const authRouter = require("./routes/authRoute");
const projectsRouter = require("./routes/projectRoute");
const connectDB = require("./db/connect");
const authmiddleware = require("./middleware/authmiddleware");
const app = express();

// error handler
const notFoundMiddleware = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorhandler");
const { connect } = require("http2");

app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/projects", authmiddleware, projectsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    await connectDB(process.env.DBURL);
    console.log("connected DB");
  } catch (error) {
    console.log(error);
  }
};

start();
