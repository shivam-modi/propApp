import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Link from "next/link";
import Services from '../components/Services';
import FeaturedProperties from '../components/FeaturedProperties';
import { Carousel } from "react-bootstrap";
import cor2 from "../public/assets/cor2.webp";
import cor7 from "../public/assets/cor7.webp";
import cor8 from "../public/assets/cor8.webp";
import Head from 'next/head';

export default function Home() {
  const imgarray = [cor8, cor7, cor2]
  const [view, setView] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 992) {
      setView(true);
    } else {
      setView(false)
    }
  }, [view])
    return (
      <main>
        <Head>
          <title>LK Modi Properties/ Home | Sale Rent Lease</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Properties that suits your needs. Looking for properties we can help you get your dream property without any worries. Want to sell or rent your property we can help get best price. We can also help you manage, and maintain your properties."
          />
          <meta
            name="keywords"
            content=" houses for rent, houses for sale, property, estate, real estate, agent, realtor, real estate agent, sell, rent, lease, shops, flat, floor, home, house, keys,  dream house, modi, properties,
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
                      relocation Realtor in delhi
                  "
          />
        </Head>
        <Carousel fade className="coro">
          {imgarray.map((val, index) => {
            return (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={val}
                  id={index}
                  alt={`slide ${index}`}
                />
                <Carousel.Caption className="defaultHero hmbanner">
                  {!view ? (
                    <Banner
                      title="We Help get your dreams"
                      subtitle="Properties for your needs"
                    >
                      <Link href="/property">
                        <a className="btn-primary">Properties</a>
                      </Link>
                    </Banner>
                  ) : (
                    <Link href="/property">
                      <a className="btn btn-primary">Properties</a>
                    </Link>
                  )}
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        <Services />
        <FeaturedProperties />
      </main>
    );
}
