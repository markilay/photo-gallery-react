import React, { useRef } from "react";
import TagsPanel from "./TagsPanel";

const Search = ({ photos, setPhotos, setQuery, setPageNumber, tags }) => {
  const searchRef = useRef();

  const resetSearch = () => {
    if (photos.length > 0) {
      setPhotos([]);
      setPageNumber(1);
    }
  };

  const searchNewPhoto = (e) => {
    e.preventDefault();
    const newQueryWord = searchRef.current.value;

    setQuery(newQueryWord);
    e.currentTarget.reset();
  };

  return (
    <div className="search">
      <form autoComplete="off" onSubmit={searchNewPhoto} onChange={resetSearch}>
        <input
          type="text"
          placeholder="Search for more inspiration"
          ref={searchRef}
        />
      </form>
      <TagsPanel
        tags={tags}
        setQuery={setQuery}
        setPhotos={setPhotos}
        setPageNumber={setPageNumber}
      />
    </div>
  );
};

export default Search;
