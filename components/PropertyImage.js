import defaultImg from "../public/assets/room-1.webp";
import Link from "next/link";

export default function PropertyImage({ id, images, purpose, price, view }) {
  return (
    <article>
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        {price != 0 ? (
          <div className="price-top">
            <h6>₹ {price}</h6>
          </div>
        ) : null}
        {!view ? (
          <Link
            href={{
              pathname: price != "0" ? `/property/[id]` : "/property",
              query: { purpose: purpose },
            }}
            as={price != "0" ? `/property/${id}` : "/property"}
          >
            <a className="btn-primary room-link">
              {price != 0 ? "Features" : "Explore"}
            </a>
          </Link>
        ) : null}
      </div>
      <p className={price != 0 ? "room-info" : "room-info sz"}>{purpose}</p>
    </article>
  );
}
