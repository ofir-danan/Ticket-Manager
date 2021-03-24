import React from "react";
import TicketCard from "./TicketCard";

const TicketsArea = ({ tickets, getAllTickets }) => {
  //   getAllTickets();
  return (
    <div>
      {tickets?.map((ticket) => {
        <TicketCard ticket={ticket} />;
      })}
    </div>
  );
};

export default TicketsArea;
