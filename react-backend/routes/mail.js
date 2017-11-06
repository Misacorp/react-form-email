var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


function sendMail(data, attachments, cb) {
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
    html: data,
    attachments: attachments
  }

  console.log("Attachments:");
  console.log(attachments);

  transporter.sendMail(mailOptions, (err, info) => {
    cb(err, info)
  });
}


router.post('/', function(req, res, next) {
  let mailData = req.body.html;
  let mailAttachments = req.body.attachments;

  // res.status(200);
  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({
  //   message: "Here come dat boi",
  //   data: mailData,
  //   attachments: mailAttachments
  // }));

  // return;

  // Attachments contains Base64 encoded image data. Build an object:
  let attachments = [];
  for(let i = 0; i < mailAttachments.length; i++) {
    let imageObject = {
      filename: `product-${i}.jpg`,
      content: mailAttachments[i].base64,
      encoding: 'base64'
    }
    attachments.push(imageObject);
    console.log("Pushed image to mail attachment array");
  }

  sendMail(mailData, attachments, (error, response) => {
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