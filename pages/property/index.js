import React from 'react'
import Link from 'next/link'
import Banner from '../../components/Banner'
import Hero from '../../components/Hero'
import PropertyContainer from '../../components/PropertyContainer'
import Head from 'next/head'

const Rooms = () => {
    return (
      <main>
        <Head>
          <title>
            Lk Modi Properties/All properties | Choose your dream property
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="All available properties, choose your dream property or invest in some for future. Contact us for buying or renting out a property"
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
                      relocation Realtor in delhi"
          />
        </Head>
        <Hero hero="roomsHero">
          <Banner title="Properties For You">
            <Link href="/">
              <a className="btn-primary">Return Home</a>
            </Link>
          </Banner>
        </Hero>
        <PropertyContainer />
      </main>
    );
}

export default Rooms
