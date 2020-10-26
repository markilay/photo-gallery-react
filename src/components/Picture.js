import React from "react";

const Picture = ({ picture }) => {
  const { alt_description: desc } = picture;
  return (
    <figure>
      <img src={`${picture.urls.small}`} alt={`${desc}`} />
    </figure>
  );
};

export default Picture;
