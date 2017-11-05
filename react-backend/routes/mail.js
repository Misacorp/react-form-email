var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');


function sendMail(data, cb) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'uhirv4w67srm6mku@ethereal.email',
      pass: 'gmF77RxUfrMTPuHdXK'
    }
  });

  console.log("Sending mail");
  
  data.to = "uhirv4w67srm6mku@ethereal.email";
  data.from = "react-form-email@test.service";

  transporter.sendMail(data, (err, info) => {
    cb(err, info)
  });
}


router.post('/', function(req, res, next) {
  let mailData = req.body;

  console.log(mailData);

  sendMail(mailData, (error, response) => {
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