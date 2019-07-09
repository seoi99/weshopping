const express = require('express');
const debug = require('debug')('app:emailRoutes');
const nodeMailer = require('nodemailer');

const adminKeys = require('../config/keys');

const emailRouter = express.Router();

function sendToUser() {
  debug(adminKeys.adminPassword);
  debug(adminKeys.adminEmail);
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminKeys.adminEmail,
      pass: adminKeys.adminPassword,
    },
  });

  const mailOptions = {
    from: adminKeys.adminEmail, // sender address
    to: 'seo9204@gmail.com', // list of receivers
    subject: 'welcome to weshopping', // Subject line
    text: 'please to see this works', // plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return debug(error);
    }
    return debug('Message %s sent: %s', info.messageId, info.response);
  });
}

function router() {
  emailRouter.get('/', sendToUser, (req, res) => {
    res.send('hello');
  });

  return emailRouter;
}


module.exports = router;
