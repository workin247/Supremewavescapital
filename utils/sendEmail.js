const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 25,
      secure: false,
      logger: true,
      debug: true,
      ignoreTLS: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls:{
        rejectUnauthorized: false,
      }
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: text,
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;