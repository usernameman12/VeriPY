const nodemailer = require('nodemailer');
const { email, password } = require('./config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

function sendCode(to, code) {
  const mailOptions = {
    from: email,
    to,
    subject: "Your Verification Code",
    text: `Your verification code is: ${code}`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendCode;
