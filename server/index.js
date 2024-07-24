const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");

const bodyParser = require("body-parser");

const postroutes = require("./routes/goats.routes.js");
const paravatroutes = require("./routes/paravat.routes.js");
const banefroutes = require("./routes/benef.routes.js");
const visitedroutes = require("./routes/visits.routes.js");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/api/v1/goat", postroutes);
app.use("/api/v1/paravat", paravatroutes);
app.use("/api/v1/banef", banefroutes);
app.use("/api/v1/visit", visitedroutes);
app.listen(3080, () => {
  console.log("Server is running on port");
});
