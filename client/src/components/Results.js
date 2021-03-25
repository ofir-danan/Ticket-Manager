import React from "react";

const Results = ({ hidden, restoreHiddenTickets, hiddenCounter, tickets }) => {
  return (
    <div>
      <p>
        {hidden ? (
          <span>
            {tickets.length - hiddenCounter} {"Results (hidden:"}
            <span id="hideTicketsCounter">{hiddenCounter}</span>
            {")"}{" "}
          </span>
        ) : (
          <span>{tickets.length} Results</span>
        )}
        <button id="restoreHideTickets" onClick={() => restoreHiddenTickets()}>
          Restore
        </button>
      </p>
    </div>
  );
};

export default Results;
