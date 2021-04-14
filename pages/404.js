import React from 'react'
import Link from 'next/link'
import Banner from '../components/Banner'
import Hero from '../components/Hero'
import Head from 'next/head';

export default function Error() {
    return (
      <main>
        <Head>
          <title>Lk Modi Properties/Error | Wrong route try one from nav</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta
            name="description"
            content="Wrong url path, use nav bar to navigate in the website"
          />
          <meta
            name="keywords"
            content="error, property, real estate, agent, realtor, real estate agent, sell, rent, lease, shops, flat, floor, home, house, keys, dream house, modi, properties"
          />
        </Head>
        <Hero>
          <Banner title="404" subtitle="page not found">
            <Link href="/">
              <a className="btn-primary">Return Home</a>
            </Link>
          </Banner>
        </Hero>
      </main>
    );
}
