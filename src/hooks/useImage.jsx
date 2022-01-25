import { useEffect, useState } from "react";

function useImage(date) {
  const [image, setImage] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getImageData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}api_key=${process.env.REACT_APP_NASA_API_KEY}&date=${date}`
        );

        const data = await response.json();

        const { code, msg, ...imageData } = data;
        if (code) {
          setError(msg);
          setLoading(false);
          setImage({});
        } else {
          setError("");
          setImage(imageData);
          setLoading(false);
        }
      } catch (error) {
        setError("There was an error, please try again.");
        setLoading(false);
      }
    }

    getImageData();
  }, [date]);

  return { image, error, loading };
}

export { useImage };
