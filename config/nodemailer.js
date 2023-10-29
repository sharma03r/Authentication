const nodemailer = require("nodemailer");

module.exports.transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  post: 587,
  //secure: false,
  auth: {
    user: "sharmarahul8848@gmail.com",
    pass: "crwaersqetcbeifz",
  },
});
