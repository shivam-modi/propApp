import React from 'react'
import { FaEnvelope, FaFacebook, FaMapMarkerAlt, FaMobile, FaMobileAlt, FaWhatsapp } from 'react-icons/fa';
import Link  from 'next/link';

function Footer() {
    return (
      <footer>
        <div className="footer-top">
          <div className="container">
            <div className="footer-day-time">
              <div className="row">
                <div className="col-md-8">
                  <ul>
                    <li>Opening Hours: Mon - Friday: 10:00 AM - 8:00 PM</li>
                    <li>Sunday: 9:30 AM - 8:30 PM</li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <div className="phone-no">
                    <a href="tel:+919811XXXXXX" className="wdt">
                      <FaMobile></FaMobile>Call +91-9811XXXXX
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <h4>About us</h4>
                <p>
                  A high-touch realtor known for his extensive market knowledge
                  and his unmatched devotion to clients. Having more than 7
                  years in the field, I recognize and value the trust my clients
                  place in me and I strive every day to exceed their
                  expectations{" "}
                </p>
              </div>

              <div className="col-md-4 set">
                <h4>Contact Us</h4>
                <ul className="address1">
                  <li>
                    <FaMapMarkerAlt className="ico"></FaMapMarkerAlt>{" "}
                    <a href="https://goo.gl/maps/yhTzyP5PSmxSswP9A">
                      {/* B-213, Rama Park, Mohan Garden, New Delhi-59 */}
                      Lorem ipsum, dolor sit amet consectetur adipisicing.
                    </a>
                  </li>
                  <li>
                    <FaEnvelope className="ico" id="envo"></FaEnvelope>{" "}
                    <a href="mailto:lkmodi28@gmail.com">blabla28@gmail.com</a>
                  </li>
                  <li>
                    <FaMobileAlt className="ico"></FaMobileAlt>{" "}
                    <a href="tel:+919811444541">98114XXXXX</a>
                  </li>
                </ul>
              </div>

              <div className="col-md-4 set">
                <h4>Follow us</h4>
                <ul className="social-icon">
                  <li>
                    <a href="#">
                      <FaFacebook className="soc"></FaFacebook>
                    </a>
                  </li>
                  <li>
                    <a href="https://api.whatsapp.com/send?phone=919811444541">
                      <FaWhatsapp className="soc"></FaWhatsapp>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-5">
                <p className="copyright text-uppercase">Copyright © 2021</p>
              </div>
              <div className="col-sm-7">
                <ul>
                  <li>
                    <Link href="/">
                      <a className="resp">Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <a className="resp">About Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/property">
                      <a className="resp">Properties</a>
                    </Link>
                  </li>
                  <li>
                    <a href="tel:+919811444541" className="resp">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer