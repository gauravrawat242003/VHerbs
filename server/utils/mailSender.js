const nodemailer = require('nodemailer');

const mailSender = async(email, title, body) => {
    try {
        // create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        // send mail
        const mailResponse = await transporter.sendMail({
            from: 'VHerbs',
            to: email,
            subject: title,
            html: body,
        });
    } catch(err) {
        console.log(err.message);
        console.log("Error while sending email...", err);
    }
}

module.exports = mailSender;