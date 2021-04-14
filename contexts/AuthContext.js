import React, { useContext, useState, useEffect } from 'react'
import {auth, firebase, db} from '../backend/firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function updateEmail(email){
        return currentUser.updateEmail(email);
    }

    function reauthenticate(password){
      var user = firebase.auth().currentUser
      console.log(user, currentUser)
      var cred = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        password
      );
       return currentUser.reauthenticateWithCredential(cred);
    }

    function updatePassword(password){
      return currentUser.updatePassword(password);
    }

    function updateContact(contact){
        var phone = `+91${contact}`;
        var applicationVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha"
        );
        var provider = new firebase.auth.PhoneAuthProvider();
        provider
          .verifyPhoneNumber(phone, applicationVerifier)
          .then((verificationId) => {
            var verificationCode = prompt("Enter the OTP: ");
            return firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
          })
          .then(function (phoneCredential) {
            return currentUser.updatePhoneNumber(phoneCredential);
          });

    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function logOut(){
       return auth.signOut()
    }

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password);
    }

   function signup(email, password) {
      return auth.createUserWithEmailAndPassword(email, password)
    }

    async function linkPhone(contact){
      var recaptcha = new firebase.auth.RecaptchaVerifier("recaptcha");
      var phone = `+91${contact}`;
     try {
        const e = await auth.currentUser
          .linkWithPhoneNumber(phone, recaptcha)
        var code = prompt("Enter the otp", "")

        if (code === null)
          return
        e.confirm(code)
          .then((res) => {
            // console.log("done")
          })
          .catch((e_1) => {
            return e_1.message
          })
      } catch (e_2) {
        return e_2.message
      }
    }

     function createUser({ email, phone, uid }) {
       db.settings({
         timestampsInSnapshots: true,
       });
       var timestamp = firebase.firestore.Timestamp.fromDate(new Date());
       return db
         .collection("users")
         .doc(uid)
         .set({
           email: email,
           phone: `+91${phone}`,
           userId: uid,
           registeredOn: timestamp,
         });
     }

     function getUser() {
       return db.collection("users").where("email", "==", currentUser.email).get();
     }

     function updateUser({email, phone, uid}) {
       return db
         .collection("users")
         .doc(uid.toString())
         .update({
           email: email,
           phone: `+91${phone}`,
         });
     }

    const value = {
      currentUser,
      signup,
      login,
      logOut,
      resetPassword,
      updateEmail,
      updatePassword,
      linkPhone,
      updateContact,
      createUser,
      updateUser,
      getUser,
      reauthenticate
    };
 
    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((user) => {
        setCurrentUser(user);  
        setLoading(false)
       });

       return unsubscribe
    }, [])


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
