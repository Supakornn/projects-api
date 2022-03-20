require("dotenv").config();
require("express-async-errors");
const express = require("express");
const authRouter = require("./routes/authRoute");
const projectsRouter = require("./routes/projectRoute");
const connectDB = require("./db/connect");
const authmiddleware = require("./middleware/authmiddleware");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const mainRouter = require("./routes/mainRoute");
const app = express();

// error handler
const notFoundMiddleware = require("./middleware/notfound");
const errorHandlerMiddleware = require("./middleware/errorhandler");
const { connect } = require("http2");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// routes

app.use("/api/info", mainRouter);
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
