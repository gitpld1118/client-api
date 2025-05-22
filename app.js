require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3001;

// API security
// app.use(helmet());

// handle CORS error
app.use(cors());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


if (process.env.NODE_ENV !== "production") {
  mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error", error);
  });

  // Logger
  app.use(morgan("tiny"));
}

// Set body bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Load routers
const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");

//Use Routers
app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);

app.use((req, res, next) => {
  const error = new Error("Resource not found!");
  error.status = 404;
  next(error);
});

// Error handler
const handleError = require("./src/utils/errorHandler");

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`API is ready on http://localhost:${port}`);
});
