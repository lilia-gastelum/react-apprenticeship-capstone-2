import React from "react";

function Image({ data }) {
  const { title, copyright, url } = data;

  return (
    <>
      <div>
        <h1 title="resTitle">{title}</h1>
        <h3> {copyright && `By ${copyright}`}</h3>
      </div>
      <div>
        <img title="image" alt={title} src={url} />
      </div>
    </>
  );
}

export default Image;
