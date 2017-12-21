# React Form Email
[![License](http://img.shields.io/:license-mit-blue.svg)](http://misacorp.mit-license.org)

Build a React form and send its content by email. Uses [react-html-email](https://github.com/chromakode/react-html-email) to build emails with React, not tables! Supports attachments and inline images.

See a live version and sell your camera gear at [cameraventures.com/buy](https://cameraventures.com/buy/)

# Getting started

Install the app with `npm install`. Before you run the app, configure the following environment variables:
```
EMAIL_RECIPIENT=your@email.recipient
GMAIL_USER=youraddress@gmail.com
GMAIL_PASSWORD=supersecret
```
Finally run the app with `npm run start`.

**Tip**: In local development you can define the above environment variables while starting the app:
```
EMAIL_RECIPIENT=your@email.recipient GMAIL_USER=youraddress@gmail.com GMAIL_PASSWORD=supersecret npm run start
```

# Configuring

## Mail settings

This app uses Nodemailer to send emails. It is configured to use Gmail as a sender, but you can use a transport of your choice by editing `server/routes/mail.js`. Refer to the [Nodemailer docs](https://nodemailer.com/smtp/) to set things up.

When using a Gmail transport you may notice that messages do not get delivered. This is most likely due to Google blocking your app from accessing the specified Gmail user's account. To remedy this, go through the following steps.

1. [Let less secure apps use your account](https://support.google.com/accounts/answer/6010255?hl=en). 
2. [Allow your new app access to your account](https://g.co/allowaccess).

Each time you deploy code, Google sees your app as a "new app". You will need to redo the second step after each deployment unless you set up an [app-specific password](https://support.google.com/accounts/answer/185833?hl=en&ctx=ch_b%2F0%2FDisplayUnlockCaptcha). I have yet to test this method myself so let me know if it works!

## Layout

The following are places you can start to configure what things look like. To customize the form itself, edit `client/src/App.js`. To customize the email that gets sent, edit `client/src/Components/Mailer.js`.

# Deploying

Heroku deployment scripts are included. Simply create a Heroku app through the [CLI](https://devcenter.heroku.com/articles/heroku-cli) with `heroku create your-app-name` and run `git push heroku master`. Remember to set the environment variables on Heroku as well!
```
heroku config:set EMAIL_RECIPIENT=your@email.recipient
heroku config:set GMAIL_USER=youraddress@gmail.com
heroku config:set GMAIL_PASSWORD=supersecret
```
