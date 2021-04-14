import React, { useState } from 'react'
import logo1 from "../public/assets/logo.png";
import {AiOutlineMenu} from "react-icons/ai";
import Link from "next/link";
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
    const [isOpen, setisOpen] = useState(false)
    // const [drawer, setDrawer] = useState(false)
    const {currentUser} = useAuth()

    const handleToggle = () => {
      setisOpen(!isOpen)
    }
        return (
          <nav className="navbark">
            <div className="nav-center">
              <div className="nav-header">
                <Link href="/">
                  <img
                    src={logo1}
                    className="lnk logoimg"
                    alt="Modi Properties"
                  />
                </Link>
                <button
                  type="button"
                  className="nav-btn"
                  onClick={handleToggle}
                >
                  <AiOutlineMenu className="nav-icon" />
                </button>
              </div>
              <ul className={isOpen ? "nav-links show-nav" : "nav-links"}>
                <li>
                  <Link href="/">
                    <a className="lnk" onClick={handleToggle}>
                      Home
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/property">
                    <a className="lnk" onClick={handleToggle}>
                      Properties
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/newproperty">
                    <a className="lnk" onClick={handleToggle}>
                      Post Property
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href={!currentUser ? "/signin" : "/dashboard"}>
                    <a className="lnk" id="imp" onClick={handleToggle}>
                      {!currentUser ? "Log In" : "Profile"}
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        );
}

export default Navbar
