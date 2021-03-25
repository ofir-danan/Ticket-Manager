import React, { useEffect, useState } from "react";
import shield from "../images/shield.png";

const TicketCard = ({
  ticket,
  hidden,
  hiddenTickets,
  restore,
  getLabelTickets,
}) => {
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
      <div className="ticket-head">
        <span>
          {ticket.done && (
            <img style={{ height: 30, marginRight: 10 }} src={shield} />
          )}
          <h3>{ticket.title}</h3>
        </span>
        <span>
          <button className="hideTicketButton" onClick={hideTicket}>
            Hide
          </button>
        </span>
      </div>
      <p>{ticket.content}</p>
      <p className="ticket-footer">
        <span>
          <span>{ticket.userEmail}</span> | {<span>{date}</span>}{" "}
        </span>
        {ticket.labels && (
          <span>
            {ticket.labels.map((label) => (
              <button
                className="label"
                key={label}
                onClick={() => getLabelTickets(label)}
              >
                {label}
              </button>
            ))}
          </span>
        )}
      </p>
    </div>
  );
};

export default TicketCard;
