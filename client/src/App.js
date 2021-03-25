import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import axios from "axios";
import TicketsArea from "./components/TicketsArea";
import Results from "./components/Results";
import noResults from "./images/noResults.png";
import ticketLogo from "./images/ticketLogo.png";

function App() {
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState([]);
  const [hidden, setHidden] = useState(false);
  const [restore, setRestore] = useState(false);
  const [hiddenCounter, setHiddenCounter] = useState(0);

  const hiddenTickets = () => {
    setHidden(true);
    setRestore(false);
    setHiddenCounter((prevState) => prevState + 1);
  };

  const restoreHiddenTickets = () => {
    setHidden(false);
    setRestore(true);
    setHiddenCounter(0);
  };

  const getLabelTickets = async (label) => {
    if (label === "All") {
      const { data } = await axios.get(`api/tickets`);
      setTickets(data);
    } else {
      const { data } = await axios.get(`api/tickets/${label}`);
      setTickets(data);
    }
  };

  const onSearchChange = async (e) => {
    setSearch(e.target.value);
    const { data } = await axios.get(
      `api/tickets?searchText=${e.target.value}`
    );
    setTickets(data);
  };

  useEffect(() => {
    const fetcAllTickets = async () => {
      const { data } = await axios.get("api/tickets");
      setTickets(data);
    };
    fetcAllTickets();
  }, []);

  return (
    <div className="main">
      <div className="searchArea">
        <h1>
          <img style={{ height: 60 }} src={ticketLogo} alt="ticket logo" />{" "}
          Ticket Manager
        </h1>
        <Search value={search} onChange={onSearchChange} />
        <Results
          hidden={hidden}
          restoreHiddenTickets={restoreHiddenTickets}
          hiddenCounter={hiddenCounter}
          tickets={tickets}
          getLabelTickets={getLabelTickets}
        />
      </div>
      <TicketsArea
        tickets={tickets}
        hidden={hidden}
        hiddenTickets={hiddenTickets}
        restore={restore}
        getLabelTickets={getLabelTickets}
      />
      {tickets.length === 0 && (
        <div className="no-results">
          <img src={noResults} alt="no results for wanted search" />
        </div>
      )}
    </div>
  );
}

export default App;
