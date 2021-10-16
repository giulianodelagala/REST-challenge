require('dotenv').config();

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = (email: string, code: string) => {
  const msg = {
    to: email,
    from: 'alexander@ravn.co', // Use the email address or domain you verified above
    subject: 'Codigo de verificacion de correo',
    text: `Tu codigo de verificacion es: ${code}`,
    html: `<strong>Tu codigo de verificacion es: <span style="font-size:20px;">${code}</span></strong>`,
  };
  const sendMail = async () => {
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  };
  sendMail();
};
