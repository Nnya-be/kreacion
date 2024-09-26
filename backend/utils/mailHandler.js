const sendgrid = require('@sendgrid/mail');
const AppError = require('./appError');

const send = sendgrid.setApiKey(process.env.MAIL_KEY);

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

