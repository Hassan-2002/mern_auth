import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false, 
  auth: {
    user: '9640f2001@smtp-brevo.com',
    pass: 'YvyZ3HUI7rOQ2gNa',
  },
});
await transporter.verify();
export default transporter 


