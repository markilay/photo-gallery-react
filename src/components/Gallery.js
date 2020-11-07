import React from "react";
import Picture from "./Picture";

const Gallery = ({photos, setModalWindowPicture}) => {
  return (
    <div className="gallery-container">
      {photos.map((photo, i) => (
         <Picture key={i} picture={photo} setModalWindowPicture={setModalWindowPicture} />        
      ))}
    </div>
  );
};

export default Gallery;
