const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;
console.log("port: " , port);
const cors = require('cors');
const auth = require('./config');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

var transport = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: auth.USER,
        pass: auth.PASS
    }
}

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});


app.post('/send', (req, res, next) => {
    const body = req.body.data;

    const name = body.contactName;
    const email = body.contactEmail;
    const message = body.contactMessage;
    const subject = body.contactSubject;
    const content = ` Name: ${name} \n Email: ${email} \n Subject: ${subject} \n Message: ${message} `;

    const mail = {
        from: name,
        to: 'sayer.tindall@gmail.com',  // Change to email address that you want to receive messages on
        subject: 'New Message from sayertindall.me',
        text: content
    };

    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.json({
                status: 'fail'
            })
        } else {
            res.json({
                status: 'success'
            })
        }
    })
});

app.listen(port, () => console.log(`Listening on ${port}`));
