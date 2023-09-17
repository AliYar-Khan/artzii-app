require("dotenv").config();
const cors = require("cors");
var express = require("express");
const userRoutes = require("./routes/UserRoutes");
const designerRoutes = require("./routes/DesignRoutes");
const connection = require("./config/db");
const PORT = process.env.PORT;
var app = express();
connection();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "x-auth-token",
      "X-Requested-With",
      "Accept",
      "Access-Control-Allow-Headers",
      "Access-Control-Request-Headers",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Credentials",
    ],
  })
);
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);
app.use("/api/design", designerRoutes);

app.listen(PORT, function () {
  console.log(`Artzii backend listening on port ${PORT}!`);
});
