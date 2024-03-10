import nodemailer from 'nodemailer';

const emailUsername = 'your-email@gmail.com'; 
const emailPassword = 'your-email-password';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUsername,
    pass: emailPassword
  }
});

export const sendOTPByEmail = async (email: string, otp: number) => {
  try {
    const mailOptions = {
      from: emailUsername,
      to: email,
      subject: 'Forget Password OTP',
      text: `Your OTP for Forget Password is: ${otp}`
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};