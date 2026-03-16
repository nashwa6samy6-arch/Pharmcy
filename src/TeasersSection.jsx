"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TeasersSection() {
  const [teasers, setTeasers] = useState([]);
  const [error, setError] = useState(null);



  // useEffect(() => {
  //   fetch("/data/teasers.json")
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch JSON");
  //       return res.json();
  //     })
  //     .then((data) => setTeasers(data))
  //     .catch((err) => {
  //       console.error(err);
  //       setError("فشل تحميل البيانات");
  //     });
  // }, []);

  // if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="row gy-4 morg">
      {teasers.map((teaser) => (
        <div key={teaser.id} className="col-12 col-md-4">
          <div className="teaser-horizontal">
            <div className="teaser-img">
              <img src={teaser.image} alt={teaser.alt} />
            </div>
            <div className="teaser-text">
              <h3>{teaser.title}</h3>
              <p>{teaser.description}</p>
              <a href={teaser.link}>{teaser.linkText}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
