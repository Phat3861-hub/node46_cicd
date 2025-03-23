import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "nguyentanphat03122004@gmail.com",
    pass: "ljjapifvldopyqxs",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Nguyễn Tấn Phát" <nguyentanphat03122004@gmail.com>', // sender address
    to: "nguyentanphat03122004@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendMail;
