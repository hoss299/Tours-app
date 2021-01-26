import React, { useState, useEffect } from "react";

import "./App.css";
// import ShowMoreText from "react-show-more-text";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchTours = async () => {
    setIsloading(false);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
    } catch (error) {
      setIsloading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeItem = (id) => {
    setTours((oldTours) => {
      let newTours = oldTours.filter((tour) => tour.id !== id);
      return newTours;
    });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <h1 className="title">Our Tours</h1>
      {tours.map((tour) => {
        return <Tour key={tour.id} tour={tour} removeItem={removeItem} />;
      })}
    </>
  );
}

const Tour = ({ tour, removeItem }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <article>
      <img src={tour.image} alt="tour-image" />
      <footer>
        <div className="tour-info">
          <h3>{tour.name}</h3>
          <h3 className="price">{tour.price} $</h3>
        </div>
        {readMore ? tour.info : `${tour.info.substring(0, 200)}...`}
        <button
          onClick={() => {
            setReadMore(!readMore);
          }}
          className="more-less-btn"
        >
          {readMore ? "show less" : "read More"}
        </button>

        <button className="remove-btn" onClick={() => removeItem(tour.id)}>
          Not interested
        </button>
      </footer>
    </article>
  );
};

export default App;
