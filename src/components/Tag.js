import React from "react";

const Tag = ({ tag, setQuery, setPhotos, setPageNumber }) => {
  const searchByTag = () => {
    setPhotos([]);
    setPageNumber(1);
    setQuery(tag);
  };
  return (
    <a className="tag" href="#" onClick={searchByTag}>
      {tag}
    </a>
  );
};

export default Tag;
