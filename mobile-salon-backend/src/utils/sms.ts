import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

export const sendSMS = async (to: string, message: string): Promise<boolean> => {
  if (!client || !fromNumber) {
    console.warn('Twilio is not configured. Skipping SMS send.');
    console.log(`SMS to ${to}: ${message}`);
    return false;
  }

  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    });
    return true;
  } catch (error) {
    console.error('SMS send failed:', error);
    return false;
  }
};