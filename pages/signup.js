import React, { useRef, useState, useEffect } from 'react'
import Link from "next/link";
import Router from "next/router"
// import {useHistory} from "react-router-dom"
import {v4 as uuidV4} from "uuid"
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import imp from "../public/assets/imp.webp";
import { useAuth } from "../contexts/AuthContext";
import Head from 'next/head';

export default function Signup() {
  const emailRef = useRef("")
  const passwordRef = useRef("")
  const confPasswordRef = useRef("")
  const contactRef = useRef("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const [code, setCode] = useState('')
  const {signup, linkPhone, createUser} =  useAuth()
  // const history = useHistory()
  let userId = uuidV4();

  async function handleSubmit(e) {
    e.preventDefault()
    if(passwordRef.current.value !== confPasswordRef.current.value){
       return setError('Password do not match')
    }
      try {
        setError("");
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value)
          .then((res) => {
            // console.log(res);
          })
          .catch((e) => {
            return setError(e.message);
          });
        await createUser({
          email: emailRef.current.value,
          phone: contactRef.current.value,
          uid: userId,
        })
          .then((res) => console.log(res))
          .catch((e) => {
            return setError(e.message);
          });
        await linkPhone(contactRef.current.value);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }      
      Router.push("/new/property");  
  }

  return (
    <main>
      <Head>
        <title>
          Lk Modi Properties/signup | Post your property for sale or rent
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Sign up to create an account to post your properties for sale, rent or lease"
        />
        <meta
          name="keywords"
          content="sign up, signup,  agent, realtor, real estate agent, create account, post property, property, real estate, sell, rent, lease, shops, flat, floor, home, house, keys,  dream house, modi, properties"
        />
      </Head>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              {/* {currentUser.email} */}
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>
                    Email
                    <img src={imp} width="7px" height="7px" />
                  </Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="pass">
                  <Form.Label>
                    Password
                    <img src={imp} width="7px" height="7px" />
                  </Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="confpass">
                  <Form.Label>
                    Confirm password
                    <img src={imp} width="7px" height="7px" />
                  </Form.Label>
                  <Form.Control
                    type="password"
                    ref={confPasswordRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="contact">
                  <Form.Label>
                    Contact
                    <img src={imp} width="7px" height="7px" />
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    pattern="[5-9]{1}[0-9]{9}"
                    ref={contactRef}
                    required
                  />
                </Form.Group>
                <div id="recaptcha"></div>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <Link href="/signin">
              <a>Log In</a>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}