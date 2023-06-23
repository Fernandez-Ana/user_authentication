import formData from 'form-data';
import Mailgun from 'mailgun.js';


const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY
});

const defaultMailOptions = {
    to: ["anafern2023@gmail.com"],
    subject: "Hello",
    html: "Testing some Mailgun awesomeness!",
};

const sendMail = async ({ to, subject, html } = defaultMailOptions) => {
    return mg.messages.create('sandbox151cacaa29fd491387ee77ac69c465aa.mailgun.org', {
        from: "Excited User <mailgun@ sandbox151cacaa29fd491387ee77ac69c465aa.mailgun.org>",
        to,
        subject,
        html
    })
        .then(msg => console.log(msg)) // logs response data
        .catch(err => console.log(err)); // logs any error
};
await sendMail()