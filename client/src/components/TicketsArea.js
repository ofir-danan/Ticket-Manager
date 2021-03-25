import React from "react";
import TicketCard from "./TicketCard";

const TicketsArea = ({ tickets, hidden, hiddenTickets, restore }) => {
  return (
    <div>
      {tickets?.map((ticket, i) => (
        <TicketCard
          key={i}
          ticket={ticket}
          hidden={hidden}
          hiddenTickets={hiddenTickets}
          restore={restore}
        />
      ))}
    </div>
  );
};

export default TicketsArea;
