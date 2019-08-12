require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailer = ({ to, subject, html }) => {
  const msg = {
    to,
    from: process.env.SENDER_EMAIL,
    subject,
    html,
  };
  return sgMail.send(msg);
};

const sendMail = (to, info) => {
  const confirmCodeMessage = {
    to,
    subject: 'Welcome to Pengin, Please Confirm your account',
    html: `Copy this code <mark><strong>${info}</strong></mark>`,
  };
  mailer(confirmCodeMessage);
};

module.exports = sendMail;
