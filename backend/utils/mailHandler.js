const nodemailer = require('nodemailer');
// const smtpTransport = require('nodemailer-smtp-transport');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgrid = require('@sendgrid/mail');
const AppError = require('./appError');

const send = sendgrid.setApiKey(process.env.MAIL_PASSWORD);
const transpoter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      // api_user: 'akwasioburo@gmail.com',
      api_key: process.env.MAIL_KEY,
    },
  }),
);

// transpoter
//       .sendMail(options)
module.exports.mailHandler = async (options) => {
  try {
    await send
      .send(options)
      .then(() => console.log('mail sent successfully'))
      .catch((err) => {
        new AppError(err, 400);
        console.error('Error:', err);
        throw err;
      });
  } catch (error) {
    console.error('Error occured while sendin mail', error);
  }
};
