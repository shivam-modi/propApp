import React, { useRef, useState } from 'react'
import Link from "next/link";
// import {useHistory} from "react-router-dom";
import Router from 'next/router'
import loading from "../public/assets/giphy.gif";
import imp from "../public/assets/imp.webp";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Head from 'next/head';

export default function SignIn() {
      const emailRef = useRef();
      const passwordRef = useRef(); 
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const { login, getUser } = useAuth();

      async function handleSubmit(e) {
        e.preventDefault();
        let userId;
        try {
          setError("");
          setLoading(true);
          await login(
            emailRef.current.value,
            passwordRef.current.value,
          )
          setLoading(false);
          Router.push("/newproperty"); 
        } catch {
          setLoading(false);
          setError("Account credentials doesn't match");
        }
      }

      return (
        <main>
          <Head>
            <title>Lk Modi Properties/login | See your posted property</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta
              name="description"
              content="Sign in to access your posted properties or post new property"
            />
            <meta
              name="keywords"
              content="sign in, log in, login, agent, realtor, real estate agent, post property, property, real estate, sell, rent, lease, shops, flat, floor, home, house, keys,  dream house, modi, properties"
            />
          </Head>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Sign In</h2>
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
                      <Form.Control
                        type="password"
                        ref={passwordRef}
                        required
                      />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">
                      Sign In
                    </Button>
                  </Form>
                  <div className="w-100 text-center mt-3">
                    <Link href="/forget-password">Forget Password?</Link>
                  </div>
                </Card.Body>
              </Card>
              <div className="w-100 text-center mt-2">
                Create an account <Link href="/signup">Sign Up</Link>
              </div>
            </div>
          </Container>
        </main>
      );
}