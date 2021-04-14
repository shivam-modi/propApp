import React, { useState } from "react";
import { db, firebase } from "../backend/firebase";
import ReCAPTCHA from "react-google-recaptcha";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import Title from "./Title";

function ResponseBox({ propertyId, uploaderId }) {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [QuerySend, setQuerySend] = useState(false);
  const [Contact, setContact] = useState("");
  const [Message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState('')

  const handleRecaptcha = async () => {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        'Content-type': 'application/json' 
      },
      body: JSON.stringify({
        token: token
      })
    })
    const data = await response.json()
    return data;
  };
 
  const sendMail = async (data) => {
    const response = await fetch("/api/email/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        link: window.location.href,
        ...data
      }),
    });
    // const result = await response.json()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(Email !== '' && Contact !== '' && Message !== '' && Name !== ''){
      const response = await handleRecaptcha();
      setError("");
      const data = {
        name: Name,
        email: Email,
        contact: Contact,
        message: Message,
      };
      if (response.success) {
        await db
          .collection("responses")
          .add({
            userId: uploaderId,
            propertyId: propertyId, 
            ...data,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
          })
          .then((val) => {
            sendMail(data)
            setQuerySend(true);
          })
          .catch((error) => setError(error.message));
      } else {
        return setError(response.msg);
      }
    } else {
      return setError("Please fill the form completely")
    }
  };

  const handleResponse = (event) => {
    const target = event.target;
    setError('')
    if (target.name == "username") {
      setName(target.value);
    } else if (target.name == "email") {
      setEmail(target.value);
    } else if (target.name == "contact") {
      setContact(target.value);
    }
  };
  return (
    <div className="respService">
      {QuerySend ? (
        <Title title="Thanks for your response, We will contact you soon 🙂" />
      ) : (
        <Container>
          <Card
            border="secondary"
            className="contain row justify-content-center"
          >
            <Card.Header className="text-center">
              <strong>Send Query/Response</strong>
            </Card.Header>
            <Card.Body>
              <Container>
                <Form>
                  <Form.Label htmlFor="username">Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleResponse}
                    value={Name}
                  />
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleResponse}
                    value={Email}
                  />
                  <Form.Label htmlFor="contact">Contact</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    name="contact"
                    id="contact"
                    pattern="[5-9]{1}[0-9]{9}"
                    onChange={handleResponse}
                    value={Contact}
                  />
                  {/* <Form.Label htmlFor="message">Message</Form.Label> */}
                  <textarea
                    name="message"
                    className="form-control mt-3"
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={Message}
                  />
                  <ReCAPTCHA
                    className="mt-3"
                    sitekey={
                      process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                    }
                    render="explicit"
                    size="normal"
                    onChange={(val) => setToken(val)}
                  />
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Button
                    type="submit"
                    name="submit"
                    className="mt-3"
                    onClick={handleSubmit}
                  >
                    Send Query
                  </Button>
                </Form>
              </Container>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>
  );
}

export default ResponseBox;
