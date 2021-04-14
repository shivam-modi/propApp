import React, { Component } from 'react'
import Title from './Title'
import { FaFileContract, FaUserTie, FaRupeeSign, FaWhatsapp } from "react-icons/fa";
import { GrServices } from "react-icons/gr";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaRupeeSign />,
        title: "Finance",
        info:
          "Home loans available at good rates, so that you can buy your dream house without any worries",
      },
      {
        icon: <GrServices className="manag" />,
        title: "Management",
        info:
          "We can help in day-to-day repairs and ongoing maintenance, security, and upkeep of your properties",
      },
      {
        icon: <FaFileContract />,
        title: "Documentation",
        info:
          "We maintain proper records of all correspondence, invoices, tenent verification, and payment records,",
      },
      {
        icon: <FaUserTie />,
        title: "Advisory",
        info:
          "Provide the best advices to investors or agents on property transactions, market information and more",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Title title="services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=919811444541&text=Hello%information%."
          className="float"
          target="_blank"
        >
          <FaWhatsapp className="my-float"></FaWhatsapp>
        </a>
      </section>
    );
  }
}
