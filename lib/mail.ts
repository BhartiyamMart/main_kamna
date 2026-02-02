import nodemailer from 'nodemailer';
import type Mail from 'nodemailer/lib/mailer';

// Email template types
export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  attachments?: Mail.Attachment[];
}

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });
};

// Singleton transporter instance
let transporter: Mail | null = null;

const getTransporter = (): Mail => {
  if (!transporter) {
    transporter = createTransporter();
  }
  return transporter;
};

/**
 * Send a basic email
 */
export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  try {
    const transport = getTransporter();

    const mailOptions: Mail.Options = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      cc: options.cc,
      bcc: options.bcc,
      replyTo: options.replyTo,
      attachments: options.attachments,
    };

    const info = await transport.sendMail(mailOptions);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send contact form notification email
 */
export async function sendContactFormEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #21502c; padding: 20px; border-radius: 5px; color: white; }
          .content { padding: 20px 0; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; color: white;">New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span>
              <span class="value">${data.firstName} ${data.lastName}</span>
            </div>
            <div class="field">
              <span class="label">Email:</span>
              <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
            </div>
            <div class="field">
              <span class="label">Phone:</span>
              <span class="value"><a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></span>
            </div>
            <div class="field">
              <span class="label">Subject:</span>
              <span class="value">${data.subject}</span>
            </div>
            <div class="field">
              <span class="label">Message:</span>
              <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phoneNumber}
Subject: ${data.subject}

Message:
${data.message}
  `.trim();

  return sendEmail({
    to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER!,
    subject: `New Contact: ${data.subject}`,
    text: textContent,
    html: htmlContent,
    replyTo: data.email,
  });
}

/**
 * Send career application notification email
 */
export async function sendCareerApplicationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  startDate?: string;
  endDate?: string;
  currentWorking: boolean;
  experience?: number;
  currentCTC: number;
  expectedCTC: number;
  noticePeriod?: string;
  resumeUrl: string;
  coverLetter?: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #21502c; padding: 20px; border-radius: 5px; color: white; }
          .content { padding: 20px 0; }
          .section { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
          .field { margin-bottom: 12px; }
          .label { font-weight: bold; color: #555; display: inline-block; min-width: 150px; }
          .value { color: #333; }
          .badge { 
            display: inline-block;
            padding: 4px 12px;
            background-color: #10b981;
            color: white;
            border-radius: 12px;
            font-size: 12px;
            font-weight: bold;
          }
          .resume-link { 
            display: inline-block; 
            margin-top: 15px;
            padding: 12px 24px; 
            background-color: #21502c; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; color: white;">New Job Application</h2>
          </div>
          <div class="content">
            <!-- Position Info -->
            <div class="section">
              <h3 style="margin-top: 0; color: #21502c;">Position Details</h3>
              <div class="field">
                <span class="label">Job Title:</span>
                <span class="value"><strong>${data.jobTitle}</strong></span>
              </div>
              <div class="field">
                <span class="label">Department:</span>
                <span class="value">${data.department}</span>
              </div>
            </div>

            <!-- Candidate Info -->
            <div class="section">
              <h3 style="color: #21502c;">Candidate Information</h3>
              <div class="field">
                <span class="label">Name:</span>
                <span class="value">${data.firstName} ${data.lastName}</span>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${data.email}">${data.email}</a></span>
              </div>
              <div class="field">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${data.phoneNumber}">${data.phoneNumber}</a></span>
              </div>
            </div>

            <!-- Professional Info -->
            <div class="section">
              <h3 style="color: #21502c;">Professional Details</h3>
              ${
                data.experience
                  ? `
              <div class="field">
                <span class="label">Total Experience:</span>
                <span class="value">${data.experience} years</span>
              </div>
              `
                  : ''
              }
              ${
                data.startDate
                  ? `
              <div class="field">
                <span class="label">Previous Org Start:</span>
                <span class="value">${data.startDate}</span>
              </div>
              `
                  : ''
              }
              ${
                !data.currentWorking && data.endDate
                  ? `
              <div class="field">
                <span class="label">Previous Org End:</span>
                <span class="value">${data.endDate}</span>
              </div>
              `
                  : ''
              }
              <div class="field">
                <span class="label">Employment Status:</span>
                <span class="value">
                  ${data.currentWorking ? '<span class="badge">Currently Working</span>' : 'Not Currently Employed'}
                </span>
              </div>
              <div class="field">
                <span class="label">Current CTC:</span>
                <span class="value">₹${data.currentCTC.toLocaleString('en-IN')} LPA</span>
              </div>
              <div class="field">
                <span class="label">Expected CTC:</span>
                <span class="value">₹${data.expectedCTC.toLocaleString('en-IN')} LPA</span>
              </div>
              ${
                data.noticePeriod
                  ? `
              <div class="field">
                <span class="label">Notice Period:</span>
                <span class="value">${data.noticePeriod}</span>
              </div>
              `
                  : ''
              }
            </div>

            <!-- Cover Letter -->
            ${
              data.coverLetter
                ? `
            <div class="section">
              <h3 style="color: #21502c;">Cover Letter</h3>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #21502c;">
                ${data.coverLetter.replace(/\n/g, '<br>')}
              </div>
            </div>
            `
                : ''
            }

            <!-- Resume -->
            <div style="text-align: center; margin-top: 30px;">
              <a href="${data.resumeUrl}" class="resume-link">Download Resume</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
New Job Application Received

POSITION DETAILS
Job Title: ${data.jobTitle}
Department: ${data.department}

CANDIDATE INFORMATION
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phoneNumber}

PROFESSIONAL DETAILS
${data.experience ? `Total Experience: ${data.experience} years` : ''}
${data.startDate ? `Previous Org Start Date: ${data.startDate}` : ''}
${!data.currentWorking && data.endDate ? `Previous Org End Date: ${data.endDate}` : ''}
Employment Status: ${data.currentWorking ? 'Currently Working' : 'Not Currently Employed'}
Current CTC: ₹${data.currentCTC} LPA
Expected CTC: ₹${data.expectedCTC} LPA
${data.noticePeriod ? `Notice Period: ${data.noticePeriod}` : ''}

${data.coverLetter ? `COVER LETTER:\n${data.coverLetter}\n` : ''}

Resume: ${data.resumeUrl}
  `.trim();

  return sendEmail({
    to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER!,
    subject: `New Application: ${data.jobTitle} - ${data.firstName} ${data.lastName}`,
    text: textContent,
    html: htmlContent,
    replyTo: data.email,
  });
}

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(
  userEmail: string,
  userName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1>Welcome, ${userName}!</h1>
          <p>Thank you for joining us. We're excited to have you on board.</p>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>Your Team</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Welcome to Our Platform!',
    html: htmlContent,
    text: `Welcome, ${userName}! Thank you for joining us.`,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  userEmail: string,
  resetToken: string,
  resetUrl: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested to reset your password. Click the button below to proceed:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Password Reset Request',
    html: htmlContent,
    text: `Reset your password: ${resetUrl}`,
  });
}

/**
 * Send OTP email
 */
export async function sendOTPEmail(
  userEmail: string,
  otp: string,
  expiryMinutes: number = 10
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Your Verification Code</h2>
          <p>Your OTP code is:</p>
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; 
                      font-size: 32px; font-weight: bold; letter-spacing: 8px; 
                      margin: 20px 0; border-radius: 5px;">
            ${otp}
          </div>
          <p>This code will expire in ${expiryMinutes} minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: 'Your Verification Code',
    html: htmlContent,
    text: `Your OTP code is: ${otp}. Valid for ${expiryMinutes} minutes.`,
  });
}

/**
 * Send order confirmation email (for e-commerce)
 */
export async function sendOrderConfirmationEmail(
  userEmail: string,
  orderDetails: {
    orderId: string;
    items: string[];
    total: string;
    userName: string;
  }
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const itemsList = orderDetails.items.map((item) => `<li>${item}</li>`).join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Order Confirmation</h2>
          <p>Hi ${orderDetails.userName},</p>
          <p>Thank you for your order! Your order ID is: <strong>${orderDetails.orderId}</strong></p>
          <h3>Order Items:</h3>
          <ul>${itemsList}</ul>
          <p><strong>Total: ${orderDetails.total}</strong></p>
          <p>We'll send you a shipping confirmation once your order ships.</p>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: userEmail,
    subject: `Order Confirmation - ${orderDetails.orderId}`,
    html: htmlContent,
    text: `Order ${orderDetails.orderId} confirmed. Total: ${orderDetails.total}`,
  });
}

/**
 * Verify SMTP connection (useful for testing)
 */
export async function verifyConnection(): Promise<boolean> {
  try {
    const transport = getTransporter();
    await transport.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP connection failed:', error);
    return false;
  }
}
