import React, { Component } from 'react'
import Property from './Property';
import Title from './Title';
import rent2 from "../public/assets/rent2.webp";
import sale from "../public/assets/sale.webp";

export default class FeaturedProperties extends Component {

    render() {
        let properties = [];
        properties.push({ purpose: "rent", id: '0', images: [rent2], price: '0' });
        properties.push({ purpose: "sale", id: '1', images: [sale], price: '0' });
        properties = properties.map(property => {
            return <Property key={property.id} property={property}/>
        })
        return (
            <section className="featured-rooms">
                <Title title="Available properties" />
                <div className="featured-rooms-center">
                  {properties}
                </div>
            </section>
        )
    }
}
