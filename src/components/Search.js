import React, { useRef } from "react";
import TagsPanel from "./TagsPanel";

const Search = ({ query, setQuery }) => {
  const searchRef = useRef();

  const searchNewPhoto = (e) => {
    e.preventDefault();
    const newQueryWord = searchRef.current.value;

    setQuery(newQueryWord);
    e.currentTarget.reset();
  };

  return (
    <div className="search">
      <form autoComplete="off" onSubmit={searchNewPhoto}>
        <input
          type="text"
          placeholder="Search for more inspiration"
          ref={searchRef}
        />
      </form>
      <TagsPanel />
    </div>
  );
};

export default Search;
