import nodemailer from 'nodemailer';
import config from '../../../config';

export async function sendEmail(to: string, html: string) {
  try {
    // ✅ 1. Create Transporter with Debugging Enabled
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: config.email, // Ensure this is correct
        pass: config.appPass, // Ensure this is correct
      },
      logger: true, // ✅ Logs all email info
      debug: true, // ✅ Enables debugging mode
    });

    // ✅ 2. Send Email
    const info = await transporter.sendMail({
      from: `"No-Reply" <${config.email}>`, // Sender address
      to, // Recipient email
      subject: 'Reset Password Link', // Subject
      html, // Email body
    });

    // ✅ 3. Log Email Success
    return {
      message: 'Email sent',
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  } catch (error) {
    // ✅ 4. Log Errors
    console.error('❌ Email sending failed:', error);
  }
}
