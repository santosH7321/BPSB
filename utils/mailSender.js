const nodemailer = require("nodemailer");

const mailSender = async(email, titel, body) =>{
    try{
            let transporter = nodeMailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: 'Bagwan Public School - by Mrinal Kumar',
            to: `${email}`,
            Subject: `${titel}`,
            html: `${body}`,
        })

        console.log(info);
        return info;
    }
        catch(error){
            console.log(error.massage);
        }
}

module.exports = mailSender;