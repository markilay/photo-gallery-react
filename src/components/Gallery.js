import React from "react";
import Picture from "./Picture";

const Gallery = ({photos}) => {
  return (
    <div className="gallery-container">
      {photos.map((photo, i) => (
         <Picture key={i} picture={photo} />        
      ))}
    </div>
  );
};

export default Gallery;
