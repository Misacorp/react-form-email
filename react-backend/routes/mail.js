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

  console.log("Attachments:");
  console.log(email.attachments);

  transporter.sendMail(mailOptions, (err, info) => {
    cb(err, info)
  });
}



// Strip Base64 headers
function stripEncodedHeaders(item) {
  return item.split(',')[1];
}



router.post('/', function(req, res, next) {
  let mailHTML = req.body.html;
  let mailAttachments = req.body.attachments;

  // Attachments contains Base64 encoded image data. Build an object:
  let attachments = [];
  for(let i = 0; i < mailAttachments.length; i++) {
    // Remove headers from Base64 string
    let encodedImage = stripEncodedHeaders(mailAttachments[i].base64);

    // Construct image object
    let imageObject = {
      filename: `product-${i}.png`,
      content: encodedImage,
      encoding: 'base64',
      contentType: mailAttachments[i].type
    }
    attachments.push(imageObject);
    console.log("Pushed image to mail attachment array");
  }

  let email = {
    html: mailHTML,
    attachments: attachments
  }

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


router.get('/', function(req, res, next) {
  res.status(200);
  res.send({ message: "Route works" });
});

module.exports = router;