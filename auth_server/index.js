const express = require("express");
const { sequelize } = require("./db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const cartRouter = require("./routes/cartRouter");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth/", authRouter);
app.use("/api/cart/", cartRouter);

sequelize
  .sync()
  .then(() => console.log("DB synced"))
  .catch((error) => console.log(error));

app.listen(5000, () => {
  console.log("App running on port 5000");
});
