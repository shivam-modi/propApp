import nodemailer from "nodemailer";

export default async (req, res) => {
 if(req.method === "POST"){
  let data = req.body
   let smtpTransport = nodemailer.createTransport({
     service: "Gmail",
     port: 465,
     secure: true,
     auth: {
       user: process.env.GMAIL_ADDRESS_FOR_RESPONSES,
       pass: process.env.GMAIL_PASSWORD_FOR_NODEMAILER,
     },
   });

   let mailOptions = {
     from: data.email,
     to: process.env.GMAIL_ADDRESS_FOR_RESPONSES,
     subject: `New response for a property from ${data.name}`,
     html: `
       <h3>User Information</h3>
        <ul>
         <li>Name: ${data.name}</li>
         <li>Email: <a href="mailto:${data.email}"> ${data.email}</a></li>
         <li>Contact: <a href="tel:${data.contact}"> ${data.contact}</a></li>
        </ul>
        <h3>Message</h3>
        <p>${data.message}<p>
        </br>
        <h4>Response for property</h4>
        <strong><a href="${data.link}">${data.link}</a></strong>
     `,
   };

   smtpTransport.sendMail(mailOptions, (error, response)=>{
    if(error){
         res.json({error: error, success: false})
     } else {
         res.json({success: true, response: response})
     }
   }) 
   smtpTransport.close()
  } else {
    res.status(500)
    res.end()
  }
}