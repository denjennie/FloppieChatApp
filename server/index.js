const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");


const app = express();
require("dotenv").config({ path: `../.env` });

app.use(express.json())
app.use("/api/auth", userRoutes)
app.use(express.urlencoded({ extended: true }))

//to provide the error in the terminal i have to set it to false first.
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB connection successfull");
}).catch((err) => {
  console.log(err.message);
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})