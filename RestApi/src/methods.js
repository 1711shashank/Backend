const express = require("express");
const app = express();

app.use(express.json());
app.listen(3000);

const userRouter = require('./Routers/userRouter');
const authRouter = require('./Routers/authRouter');

app.use("/auth", authRouter);
// app.use("/user", userRouter);



