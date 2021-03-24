import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div>
      <input
        id="search"
        placeholder="Search here..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
