import React, { Component } from "react";
import Banner from "../../../components/Banner";
import Link from "next/link";
import {withRouter} from 'next/router'
import {FaWhatsapp} from "react-icons/fa"
import defaultBcg from "../../../public/assets/room-1.webp";
import { PropertyContext } from "../../../contexts/PropertyContext";
import StyledHero from "../../../components/StyledHero";
import Loading from "../../../components/Loading";
import ResponseBox from "../../../components/ResponseBox";
import Head from "next/head";


class SingleRoom extends Component {
  constructor(props) {
    super(props);
    const {id} = props.router.query
    this.state = {
      id: id,
      defaultBcg,
    };
  }
  static contextType = PropertyContext;

  render() {
    const { getProperty, loading } = this.context;
    const property = getProperty(this.state.id);
    if (loading) {
      return (
        <div className="error">
          <Loading />
        </div>
      );
    }

    if (!property) {
      return (
        <div className="error">
          <h3>No such property found...</h3>
          <Link href="/property" className="btn-primary">
            Back to All Properties
          </Link>
        </div>
      );
    }

    const {
      userId,
      id,
      purpose,
      type,
      description,
      location,
      age,
      bedroom,
      registery,
      balcony,
      bathroom,
      propFloor,
      totalFloor,
      furnished,
      security,
      modularKitchen,
      lift,
      parking,
      metroDis,
      hospitalDis,
      airportDis,
      busstandDis,
      totalArea,
      builtArea,
      areaUnit,
      availMonth,
      availYear,
      price,
      images,
    } = property;
    const [mainImg, ...defaultImg] = images;

    return (
      <main>
        <Head>
          <title>
            Lk Modi Properties/{id} | Contact to buy or rent out property
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="keywords"
            content="property, estate, real estate, agent, realtor, real estate agent, sell, rent, lease, shops, flat, floor, home, house, keys,  dream house, modi, properties,
                      Realtor,
                      Realtors,
                      finding a Realtor,
                      how to find a Realtor,
                      find real estate agents,
                      how to find a real estate agent,
                      best Realtor near dwarka,
                      top realtor for buying a new home,
                      top real estate agents in dwarka,
                      top real estate agents in mohan garden,
                      selling a home,
                      sell a home fast,
                      fastest way to sell a home in delhi,
                      home selling tips,
                      cost of selling your home,
                      marketing your home,
                      ways to sell your home,
                      house staging tips,
                      how to stage your home,
                      foreclosure,
                      forecloures,
                      short sales,
                      foreclosure or short sale,
                      short selling,
                      short sale process,
                      cons of a short sale,
                      short selling your home,
                      for sale by owner,
                      why to use a Realtor,
                      property for sale by owner,
                      for sale by owner listings,
                      listing property for sale by owner,
                      selling your home by owner,
                      selling real estate without a Realtor,
                      tips for selling your home,
                      short selling your home,
                      top tips to get the best offer,
                      best improvements for home valuation,
                      process for selling a home,
                      tips to sell your idol home,
                      tips to sell in under a month,
                      do open houses sell houses,
                      best Realtor in uttam nagar
                      top rated Realtor in nawada,
                      house for sale on delhi,
                      buy real estate,
                      buy home,
                      process of buying a home,
                      best real estate listings,
                      find real estate,
                      foreclosures for sale,
                      buy a home,
                      houses for sale,
                      house 4 sale,
                      real estate agent listings,
                      condos for sale,
                      townhomes for sale,
                      town houses for sale,
                      mls listings,
                      real estate listing mls,
                      mls real estate listings,
                      multiple listing services,
                      first time home buyer guide,
                      best homes for first time home buyer,
                      first time home buyer programs,
                      home buyer help,
                      list of real estate agents,
                      reviews of Realtor,
                      best homes for it employees,
                      relocation Realtor in delhi"
          />
        </Head>
        <StyledHero img={mainImg || this.state.defaultBcg}>
          <Banner title={`${type}`}>
            <Link href="/property">
              <a className="btn-primary">Back to Property</a>
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={type} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="info">
              <h3>info</h3>
              <h6>
                <b>available for : {purpose}</b>
              </h6>
              <h6>price : ₹{price}</h6>
              <h6>
                built in area: {builtArea} {areaUnit}
              </h6>
              <h6>
                total area: {totalArea} {areaUnit}
              </h6>
              <h6>bedrooms : {bedroom}</h6>
              <h6>
                age of property : {age} {age > 1 ? "years" : "year"}
              </h6>
              <h6>
                available from : {availMonth}, {availYear}
              </h6>
              {type === "Residential House" ||
              type === "Villa" ||
              type === "Residential Land" ||
              type === "Penthouse" ||
              type === "Shop" ? null : (
                <h6>Floor : {propFloor}</h6>
              )}
              <h6>location : {location.locality}</h6>
              {purpose === "sale" ? (
                <h6>registery : {registery ? "available" : "no registery"}</h6>
              ) : null}
            </article>
            <article className="desc">
              <h3>Description</h3>
              <p>{description}</p>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            <li key="1">nearest metro {metroDis} km</li>
            <li key="2">nearest hospital {hospitalDis} km</li>
            <li key="3">nearest busstand {busstandDis} km</li>
            <li key="4">nearest airport {airportDis} km</li>
            <li key="9">balcony : {balcony}</li>
            <li key="10">bathroom : {bathroom}</li>
            <li key="11">furnished status : {furnished}</li>
            <li key="5">{lift && "lift"}</li>
            <li key="6">{modularKitchen && "modular kitchen"}</li>
            <li key="7">{security && "secured property"}</li>
            <li key="8">{parking && "car parking"}</li>
          </ul>
        </section>
        <a
          href="https://api.whatsapp.com/send?phone=919811444541&text=Hello%information%."
          className="float"
          target="_blank"
        >
          <FaWhatsapp className="my-float"></FaWhatsapp>
        </a>
        <ResponseBox propertyId={id} uploaderId={userId} />
      </main>
    );
  }
}

export default withRouter(SingleRoom)