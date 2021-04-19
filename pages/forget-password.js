import React, { useRef, useState } from "react";
import Link from "next/link";
import Loading from '../components/Loading'
import imp from "../public/assets/imp.webp";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Head from "next/head";
import {useRouter} from "next/router";


export default function ForgetPassword() {
      const emailRef = useRef();
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const { resetPassword } = useAuth();
      const [message, setMessage] = useState("");
      const {currentUser} = useAuth()
      const router = useRouter()

      if(currentUser){
        router.replace('/dashboard')
      }

      async function handleSubmit(e) {
        e.preventDefault();
        try {
          setError("");
          setLoading(true);
           await resetPassword(emailRef.current.value)
           setMessage("Check your inbox for further instructions")
        } catch {
          setError("Failed to reset password");
        }
        setLoading(false);
      }

      return (
        <>
          <Head>
            <title>
              Lk Modi Properties/change password | Change your forgetten
              password
            </title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta
              name="description"
              content="Update your for forgotten password so that you can access your account"
            />
            <meta
              name="keywords"
              content="forget password, forget, agent, realtor, real estate agent, password, credentials, update account, post property, property, real estate, sell, rent, lease, shops, flat, floor, home, house, keys,  dream house, modi, properties"
            />
          </Head>
          {!currentUser ? (
            <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: "100vh" }}
            >
              <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">Password Reset</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                      <Form.Group id="email">
                        <Form.Label>
                          Email
                          <img src={imp} width="7px" height="7px" />
                        </Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                      </Form.Group>
                      <Button
                        disabled={loading}
                        className="w-100"
                        type="submit"
                      >
                        Reset Password
                      </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                      <Link href="/signin">Login</Link>
                    </div>
                  </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                  Create an account <Link href="/signup">Sign Up</Link>
                </div>
              </div>
            </Container>
          ) : (
            <Loading />
          )}
        </>
      );
}
