require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);
    app.listen(PORT, () =>
      console.log(`app listening at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const ticketsSchema = new mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true },
  userEmail: { type: String, require: true },
  done: { type: Boolean, default: false, require: false },
  creationTime: { type: Number, default: new Date() },
  labels: { type: Array, require: false },
});

const Ticket = mongoose.model("Ticket", ticketsSchema);

app.get("/api/tickets", (req, res) => {
  try {
    Ticket.find({}).then((tickets) => {
      console.log(tickets);
      res.status(200).json(tickets);
    });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong... Error: " + error);
  }
});

app.patch("/api/tickets/:ticketId/done", (req, res) => {
  try {
    Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { done: true },
      (err, result) => {
        if (err) {
          throw new Error("Sorry, We Couldn't Update this ticket");
        } else {
          res.status(200).json({ updated: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.patch("/api/tickets/:ticketId/undone", (req, res) => {
  try {
    Ticket.findByIdAndUpdate(
      req.params.ticketId,
      { done: false },
      (err, result) => {
        if (err) {
          throw new Error("Sorry, We Couldn't Update this ticket");
        } else {
          res.status(200).json({ updated: true });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
