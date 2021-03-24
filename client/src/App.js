import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import axios from "axios";
import TicketsArea from "./components/TicketsArea";

function App() {
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState([]);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getAllTickets = async () => {
    let ticketsArray = [];
    let { data } = await axios.get("api/tickets");
    console.log(data);
    ticketsArray.push(data);
    setTickets(ticketsArray);
    console.log(tickets);
  };

  useEffect(() => getAllTickets);
  return (
    <div>
      <Search value={search} onChange={onSearchChange} />
      <TicketsArea tickets={tickets} />
    </div>
  );
}

export default App;
