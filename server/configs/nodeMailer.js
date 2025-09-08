import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.STMP_USER,
      pass: process.env.STMP_PASS,
    },
});

const sendEmail = async ({to, subject, body}) => {
    const response = await transporter.sendMail({
        from: process.env.STMP_USER,
        to,
        subject,
        html: body,
    })
    return response;
}

export default sendEmail;
