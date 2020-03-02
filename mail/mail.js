const express = require('express');
// const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const auth = require('./config');
console.log("Auth: ", auth);
const app = express()
app.use(cors())
app.use(express.json())
// app.use('/', router)
app.listen(3002)

var transport = {
    host: 'smtp.gmail.com', // Don’t forget to replace with the SMTP host of your provider
    port: 587,
    auth: {
        user: auth.USER,
        pass: auth.PASS
    }
}

let transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});


app.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `

    var mail = {
        from: name,
        to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE',  // Change to email address that you want to receive messages on
        subject: 'New Message from Contact Form',
        text: content
    }

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
})


