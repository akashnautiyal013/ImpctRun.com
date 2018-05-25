 const nodemailer = require ("nodemailer");

 module.exports = {

    sendMail (mailTitle,userEmail,EmailMessage,Subject,templet){
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "team@impactrun.com", //  user
                pass: "sharingsmiles" // password
            }
        });

        let mailOptions = {
            from: JSON.stringify(mailTitle)+'<team@impactrun.com>', // sender address
            to: userEmail, // list of receivers
            subject:(Subject != undefined || Subject != null )? Subject:" ", // Subject line
            text: (EmailMessage != undefined || EmailMessage != null )? EmailMessage:" ", // plain text body
            html: templet // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          
        });
    }
}