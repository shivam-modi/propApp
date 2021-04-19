import React, { useRef, useState } from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import { Card, Button, Form, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading"
import Head from "next/head";

export default function UpdateProfile() {
   const emailRef = useRef("");
   const passwordRef = useRef("");
   const newPasswordRef = useRef("");
   const confPasswordRef = useRef("");
   const contactRef = useRef("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const {
     currentUser,
     updateEmail,
     updatePassword,
     updateContact,
     updateUser,
     reauthenticate,
   } = useAuth();
   const router = useRouter();
   const userId = router.query.userId;
   
   if(!currentUser){
     router.replace('/signin')
   }

   function handleSubmit(e) {
     e.preventDefault();
    //  if () {
    //    return setError("Password do not match");
    //  }

     setLoading(true) 
     setError("")
    //  const promises = []
    try {
      if (emailRef.current.value !== currentUser.email || confPasswordRef.current.value !== ""){
         reauthenticate(passwordRef.current.value).then(() => {
            if (emailRef.current.value !== currentUser.email) {
              updateEmail(emailRef.current.value)
                .then((res) => console.log(res))
                .catch((err) => setError(err.messsage));
            }
            if (newPasswordRef.current.value === confPasswordRef.current.value) {
              updatePassword(passwordRef.current.value)
                .then((res) => console.log(res))
                .catch((err) => setError(err.messsage));
            }
            if (`+91${contactRef.current.value}` !== currentUser.phoneNumber) {
              updateContact(contactRef.current.value)
                .then((res) => console.log(res))
                .catch((err) => setError(err.messsage));
            }
    
            if (
              `+91${contactRef.current.value}` !== currentUser.phoneNumber ||
              emailRef.current.value !== currentUser.email
            ) {
              updateUser({
                email: emailRef.current.value,
                phone: contactRef.current.value,
                uid: userId,
              });
            }
            setLoading(false);
         }).catch(err => setError(err.message))
      }
        
       router.push("/dashboard");    
    } catch (error) {
      setError(error.message)
    } 
    
      
   }
  //  let number = currentUser.phoneNumber;
  //  number = number.slice(3, 13) 
   
   return (
     <section>
       <Head>
         <title>Lk Modi Properties/update | Update account details</title>
         <meta
           name="viewport"
           content="width=device-width, initial-scale=1.0"
         />
         <meta
           name="description"
           content="Update profile so that we can contact you easily and make you aware of the responses your property got"
         />
         <meta
           name="keywords"
           content="update, profile, update profile, agent, realtor, real estate agent,  property, real estate, sell, rent, lease, shops, flat, floor, home, house, keys, dream house, modi, properties"
         />
       </Head>
       {!currentUser ? (
         <Loading />
       ) : (
         <Container
           className="d-flex align-items-center justify-content-center"
           style={{ minHeight: "100vh" }}
         >
           <div className="w-100" style={{ maxWidth: "400px" }}>
             <Card>
               <Card.Body>
                 {/* {currentUser.email} */}
                 <h2 className="text-center mb-4">Update Profile</h2>
                 {error && <Alert variant="danger">{error}</Alert>}
                 <Form onSubmit={handleSubmit}>
                   <Form.Group id="email">
                     <Form.Label htmlFor="emailref">
                       Email
                       {/* <img src={imp} width="7px" height="7px" /> */}
                     </Form.Label>
                     <Form.Control
                       type="email"
                       id="emailref"
                       ref={emailRef}
                       required
                       defaultValue={currentUser.email}
                     />
                   </Form.Group>
                   <Form.Group id="pass">
                     <Form.Label htmlFor="passref">
                       Password
                       {/* <img src={imp} width="7px" height="7px" /> */}
                     </Form.Label>
                     <Form.Control
                       type="password"
                       required
                       id="passref"
                       ref={passwordRef}
                       placeholder="Enter password"
                     />
                   </Form.Group>
                   <Form.Group id="newpass">
                     <Form.Label htmlFor="newpassref">
                       New Password
                       {/* <img src={imp} width="7px" height="7px" /> */}
                     </Form.Label>
                     <Form.Control
                       type="password"
                       id="newpassref"
                       ref={newPasswordRef}
                       placeholder="Leave blank to keep the same"
                     />
                   </Form.Group>
                   <Form.Group id="confpass">
                     <Form.Label htmlFor="confpassref">
                       Confirm password
                       {/* <img src={imp} width="7px" height="7px" /> */}
                     </Form.Label>
                     <Form.Control
                       type="password"
                       id="confpassref"
                       ref={confPasswordRef}
                       placeholder="Leave blank to keep the same"
                     />
                   </Form.Group>
                   <Form.Group id="contact">
                     <Form.Label>
                       Contact
                       {/* <img src={imp} width="7px" height="7px" /> */}
                     </Form.Label>
                     <Form.Control
                       type="tel"
                       pattern="[5-9]{1}[0-9]{9}"
                       ref={contactRef}
                       defaultValue={currentUser.phoneNumber.slice(3, 13)}
                       required
                     />
                   </Form.Group>
                   <div id="recaptcha"></div>
                   <Button disabled={loading} className="w-100" type="submit">
                     Update
                   </Button>
                 </Form>
               </Card.Body>
             </Card>
             <div className="w-100 text-center mt-2">
               <Link href="/dashboard"><a>Cancel</a></Link>
             </div>
           </div>
         </Container>
       )}
     </section>
   );
}
