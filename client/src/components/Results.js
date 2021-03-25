import React from "react";

const Results = ({
  hidden,
  restoreHiddenTickets,
  hiddenCounter,
  tickets,
  getLabelTickets,
}) => {
  let labelsFromTickets = tickets.map((ticket) => ticket.labels);
  labelsFromTickets = [].concat(...labelsFromTickets);
  let labelsArray = [...new Set(labelsFromTickets)];

  return (
    <div>
      <p className="results">
        {hidden ? (
          <span>
            {tickets.length - hiddenCounter} {"Results (hidden:"}
            <span id="hideTicketsCounter">{hiddenCounter}</span>
            <button
              id="restoreHideTickets"
              onClick={() => restoreHiddenTickets()}
            >
              Restore
            </button>
            {")"}{" "}
          </span>
        ) : (
          <span>{tickets.length} Results</span>
        )}
      </p>
      {
        <div>
          {labelsArray &&
            labelsArray.map((label) => (
              <button
                className="label"
                key={label}
                onClick={() => getLabelTickets(label)}
              >
                {label}
              </button>
            ))}
          <button className="label" onClick={() => getLabelTickets("All")}>
            All
          </button>
        </div>
      }
    </div>
  );
};

export default Results;
