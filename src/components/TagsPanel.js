import React from "react";
import Tag from "./Tag";

const TagsPanel = ({ tags, setQuery, setPhotos, setPageNumber }) => {
  return (
    <div className="tags-panel">
      {tags.map((tag, i) => (
        <Tag
          key={i}
          tag={tag}
          setQuery={setQuery}
          setPhotos={setPhotos}
          setPageNumber={setPageNumber}
        />
      ))}
    </div>
  );
};

export default TagsPanel;
