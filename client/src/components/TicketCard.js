import React, { useEffect, useState } from "react";

const TicketCard = ({ ticket, hidden, hiddenTickets, restore }) => {
  const [hide, setHide] = useState(false);

  const hideTicket = () => {
    setHide(true);
    hiddenTickets();
  };

  useEffect(() => {
    if (restore && !hidden) {
      setHide(false);
    }
  }, [restore, hidden]);

  let date = new Date(ticket.creationTime);
  date = date.toDateString() + " - " + date.toISOString().slice(11, 16);
  return (
    <div key={ticket._id} className={hide ? "hide-ticket" : "ticket"}>
      <div>
        <h3>{ticket.title}</h3>{" "}
        <button className="hideTicketButton" onClick={hideTicket}>
          Hide
        </button>{" "}
      </div>
      <p>{ticket.content}</p>
      <p>
        <span>{ticket.userEmail}</span> | {<span>{date}</span>}
      </p>
    </div>
  );
};

export default TicketCard;
