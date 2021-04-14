import { useState, useEffect } from 'react'
import Link from 'next/link'
import PropTypes from "prop-types";
import PropertyImage from './PropertyImage';

export default function Property({property}) {
    const {purpose, id, images, price} = property;
    const [view, setView] = useState(false)
    
    useEffect(() => {
      if(window.innerWidth < 992){
        setView(true)
      }
    }, [view])

    return (
      <article className="room">
        {view ? (
          <Link
            href={{
              pathname: price != "0" ? `/property/[id]` : "/property",
              query: { purpose: purpose },
            }}
            as={price != "0" ? `/property/${id}` : "/property"}
          >
            <a className="vwimg">
              <PropertyImage
                images={images}
                price={price}
                purpose={purpose}
                view={view}
                id={id}
              />
            </a>
          </Link>
        ) : (
          <PropertyImage
            images={images}
            price={price}
            purpose={purpose}
            view={view}
            id={id}
          />
        )}
      </article>
    );
}

Property.propTypes = {
  property: PropTypes.shape({
    purpose: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.string.isRequired,
  }),
};