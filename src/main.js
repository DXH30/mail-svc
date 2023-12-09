const express = require('express');
const nodemailer = require('nodemailer');
const fileUpload = require('express-fileupload');

const app = express();
const port = process.env.PORT || 3000;

// Use express-fileupload middleware to handle file uploads
app.use(fileUpload());

// Retrieve email credentials from environment variables
const emailUser = process.env.EMAIL_USER || 'dhs0223@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'uxgf zgtk wjkx qwpl';

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Define a hardcoded subject and text
const hardcodedSubject = 'Daily Report';
const hardcodedText = 'Here is the daily report.';

// Define an endpoint to send emails with attachments
app.post('/send', (req, res) => {
  const { email } = req.body;

  if (!email || !req.files || !req.files.attachment) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  const attachment = req.files.attachment;

  const mailOptions = {
    from: emailUser,
    to: email,
    subject: hardcodedSubject,
    text: hardcodedText,
    attachments: [
      {
        filename: attachment.name,
        content: attachment.data,
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
