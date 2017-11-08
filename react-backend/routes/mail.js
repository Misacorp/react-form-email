var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


// Sends email
function sendMail(email, cb) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'uhirv4w67srm6mku@ethereal.email',
      pass: 'gmF77RxUfrMTPuHdXK'
    }
  });

  console.log("Sending mail");
  
  const mailOptions = {
    from: "react-form-email@test.service",
    to: "uhirv4w67srm6mku@ethereal.email",
    subject: "Testi",
    html: email.html,
    attachments: email.attachments
  }

  // Debug
  console.log("Attachments:");
  for(let i = 0; i < email.attachments.length; i++) {
    console.log("Filename: " + email.attachments[i].filename);
  }

  transporter.sendMail(mailOptions, (err, info) => {
    cb(err, info)
  });
}



// Route: POST /mail
router.post('/', function(req, res, next) {
  let mailHTML = req.body.html;
  let mailAttachments = req.body.attachments;

  // Attachments contains Base64 encoded image data. Build an object:
  let attachments = [];
  for(let i = 0; i < mailAttachments.length; i++) {
    // Remove headers from Base64 string
    let encodedImage = mailAttachments[i].base64.split(',')[1];
    // Get file extension
    let extension = mailAttachments[i].type.split('/')[1];

    // Construct image object
    let imageObject = {
      filename: `product-${i}.${extension}`,
      content: encodedImage,
      encoding: 'base64',
      contentType: mailAttachments[i].type,
      cid: mailAttachments[i].cid
    }
    // Push image object to attachments array
    attachments.push(imageObject);
  }

  // Construct email object with two parts: HTML and attachments
  let email = {
    html: mailHTML,
    attachments: attachments
  }

  // Send email and handle result
  sendMail(email, (error, response) => {
    if(error) {
      console.log("Mail error!");
      res.status(500);
      res.send( error );
    }
    else {
      console.log("Mail success!");
      res.status(200);
      res.send( response );
    }
  });
});

module.exports = router;