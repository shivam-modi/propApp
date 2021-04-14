import React from 'react'
import { FaTimes } from "react-icons/fa";

export default function PropertyImageU({image, removeImg}) {
    
    return (
      <article className="wrapper room">
        <div className="img-contain">
          <img
            src={image || "https://via.placeholder.com/250x200"}
            alt="single room"
          />
          <div className="price-top" onClick={() => removeImg(image)}>
            <h6>
              <FaTimes />
            </h6>
          </div>
        </div>
      </article>
    );
}
