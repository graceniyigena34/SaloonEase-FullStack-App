import nodemailer from 'nodemailer';



const getTransporter = () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }
  return null;
};

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = getTransporter();
  const smtpFrom = process.env.SMTP_FROM || 'no-reply@mobilesalon.local';

  if (!transporter) {
    console.warn('SMTP is not configured. Skipping email send.');
    console.log('DEBUG Info:', {
      host: !!process.env.SMTP_HOST,
      user: !!process.env.SMTP_USER,
      pass: !!process.env.SMTP_PASS
    });
    return false;
  }

  await transporter.sendMail({
    from: smtpFrom,
    to,
    subject,
    text,
  });

  return true;
};
