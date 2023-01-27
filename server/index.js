import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import messagesRoute from "./routes/messagesRoute.js";
import dotenv from "dotenv";
const app = express();
dotenv.config({ path: `../.env` });

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

let connections = [];
app.get("/api/sse", (req, res) => {
  // Add the response to open connections
  connections.push(res);

  // listen for client disconnection
  // and remove the client's response
  // from the open connections list
  req.on("close", () => {
    connections = connections.filter((openRes) => openRes != res);

    // message all open connections that a client disconnected
    broadcast("disconnect", {
      message: "client disconnected",
    });
  });

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
  });

  // message all connected clients that this
  // client connected
  broadcast("connect", {
    message: "clients connected: " + connections.length,
  });
});

export function broadcast(event, data) {
  // loop through all open connections and send
  // some data without closing the connection (res.write)
  for (let res of connections) {
    // syntax for a SSE message: 'event: message \ndata: "the-message" \n\n'
    res.write("event:" + event + "\ndata:" + JSON.stringify(data) + "\n\n");
  }
}

app.use(express.urlencoded({ extended: true }));

//to provide the error in the terminal i have to set it to false first.
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
