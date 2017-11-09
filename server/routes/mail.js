var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


// Sends email
function sendMail(email, cb) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  
  const mailOptions = {
    from: 'tradebot@cameraventures.com',
    to: process.env.EMAIL_RECIPIENT,
    subject: "Offer Request",
    html: email.html,
    attachments: email.attachments,
    headers: {
      'Reply-To': 'custom@reply-to.address'
    }
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


router.get('/', function(req, res, next) {
  res.json({
    route: "/mail",
    status: "operational"
  });
});

module.exports = router;