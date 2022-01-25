import React, { useRef, useState } from "react";
import { useImage } from "../../hooks/useImage";
import "./Display.styles.css";
import Image from "./Image";
import Video from "./Video";

function Display() {
  const initDate = new Date().toISOString().split("T")[0];
  const dateRef = useRef(initDate);
  const [selectedDate, setSelectedDate] = useState(initDate);
  const { image, error, loading } = useImage(selectedDate);

  const { media_type } = image;

  return (
    <section className="homepage">
      <div className="stars">
        <div className="twinkling">
          {loading && <div className="loader"></div>}
          <h3> Photo of the day</h3>
          <h5> Select a date</h5>
          <input title="date" ref={dateRef} type={"date"} useref={"date"} />
          <button onClick={() => setSelectedDate(dateRef.current.value)}>
            Show
          </button>
          {media_type &&
            (media_type === "image" ? (
              <Image data={image} />
            ) : (
              <Video data={image} />
            ))}
          <p>{error}</p>
        </div>
      </div>
    </section>
  );
}

export default Display;
