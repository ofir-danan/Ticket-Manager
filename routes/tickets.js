const router = require("express").Router();
const Ticket = require("../models/ticket.model");

router.get("/", (req, res) => {
  try {
    const searchText = req.query.searchText;
    const regex = RegExp(searchText, "i");
    Ticket.find({ title: { $regex: regex } }).then((tickets) => {
      res.status(200).json(tickets);
    });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong... Error: " + error);
  }
});

router.get("/:label", (req, res) => {
  try {
    const label = req.params.label;
    Ticket.find({ labels: label }).then((tickets) => {
      res.status(200).json(tickets);
    });
  } catch (error) {
    console.log(error);
    res.send("Something went wrong... Error: " + error);
  }
});

router.patch("/:ticketId/done", (req, res) => {
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

router.patch("/:ticketId/undone", (req, res) => {
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

router.post("/add", (req, res) => {
  try {
    const body = req.body;
    const ticket = new Ticket({
      title: body.title,
      content: body.content,
      userEmail: body.userEmail,
    });
    ticket.save().then((savedTicket) => {
      res.status(200).json(savedTicket);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
