import React from "react";
import TicketCard from "./TicketCard";

const TicketsArea = ({
  tickets,
  hidden,
  hiddenTickets,
  restore,
  getLabelTickets,
}) => {
  return (
    <div>
      {tickets &&
        tickets.map((ticket, i) => (
          <TicketCard
            key={i}
            ticket={ticket}
            hidden={hidden}
            hiddenTickets={hiddenTickets}
            restore={restore}
            getLabelTickets={getLabelTickets}
          />
        ))}
    </div>
  );
};

export default TicketsArea;
