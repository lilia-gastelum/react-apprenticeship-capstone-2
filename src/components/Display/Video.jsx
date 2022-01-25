import React from "react";

function Video({ data }) {
  const { title, url, copyright } = data;

  return (
    <>
      <div>
        <h1 title="resTitle">{title}</h1>
        <h3> {copyright && `By ${copyright}`}</h3>
      </div>
      <div>
        <iframe width="840" height="630" title={"video"} src={url} />
      </div>
    </>
  );
}

export default Video;
