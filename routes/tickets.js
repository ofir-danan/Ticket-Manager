const router = require("express").Router();
const Ticket = require("../models/ticket.model");

router.get("/", (req, res) => {
  try {
    const searchText = req.query.searchText;
    const regex = RegExp(searchText, "i");
    Ticket.find({ title: { $regex: regex } }).then((tickets) => {
      console.log(tickets.length);
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

module.exports = router;
