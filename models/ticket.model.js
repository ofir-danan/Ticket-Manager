const mongoose = require("mongoose");

const ticketsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userEmail: { type: String, required: true },
  done: { type: Boolean, default: false },
  creationTime: { type: Number, default: new Date() },
  labels: { type: Array, required: false },
});

const Ticket = mongoose.model("Ticket", ticketsSchema);

module.exports = Ticket;
