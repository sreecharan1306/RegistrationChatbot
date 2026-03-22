/**
 * Brevo API integration for sending emails and managing contacts
 * Documentation: https://developers.brevo.com/docs/
 */

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
const BREVO_SENDER_EMAIL = 'contact@mail.com'; // Change this to your verified Brevo sender email
const BREVO_API_URL = 'https://api.brevo.com/v3';

interface BrevoResponse {
  success: boolean;
  error?: string;
  messageId?: string;
  contactId?: number;
}

/**
 * Send transactional email with recruit details
 * Used to notify the recruiter about a new lead
 */
export async function sendTransactionalEmail(
  recruiterEmail: string,
  recruiterName: string,
  developerName: string,
  developerEmail: string,
  developerPhone: string
): Promise<BrevoResponse> {
  if (!BREVO_API_KEY) {
    console.error('[Brevo] API key not configured');
    return {
      success: false,
      error: 'Brevo API key not configured',
    };
  }

  try {
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>New Lead - IGRS AI Chatbot</h2>
          <p>Hello ${recruiterName},</p>
          <p>A new developer has shown interest in our IGRS Telangana AI Assistant program:</p>
          <table style="border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${developerName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;"><a href="mailto:${developerEmail}">${developerEmail}</a></td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${developerPhone}</td>
            </tr>
          </table>
          <p>Please follow up with them at your earliest convenience.</p>
          <p>Best regards,<br/>IGRS AI System</p>
        </body>
      </html>
    `;

    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'IGRS AI Assistant', email: BREVO_SENDER_EMAIL },
        to: [{ email: recruiterEmail, name: recruiterName }],
        subject: 'New Lead - IGRS AI Chatbot Program',
        htmlContent: emailContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Brevo] Email send failed:', error);
      return {
        success: false,
        error: `Email send failed: ${error.message || response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('[Brevo] Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send notification email to developer
 * Confirms their submission and provides next steps
 */
export async function sendConfirmationEmail(
  developerEmail: string,
  developerName: string
): Promise<BrevoResponse> {
  if (!BREVO_API_KEY) {
    console.error('[Brevo] API key not configured');
    return {
      success: false,
      error: 'Brevo API key not configured',
    };
  }

  try {
    const emailContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2>Welcome to IGRS AI Assistant Program!</h2>
          <p>Hello ${developerName},</p>
          <p>Thank you for showing interest in the IGRS Telangana AI Assistant program. Your submission has been received and we're excited to connect with you!</p>
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>Our team will review your profile</li>
            <li>You'll receive a follow-up email within 24-48 hours</li>
            <li>We'll schedule a brief call to discuss the opportunity</li>
          </ul>
          <p>In the meantime, feel free to explore the chatbot and learn more about our program.</p>
          <p style="margin-top: 30px;">Best regards,<br/><strong>IGRS AI Assistant Team</strong><br/>Government of Telangana</p>
        </body>
      </html>
    `;

    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'IGRS AI Assistant', email: BREVO_SENDER_EMAIL },
        to: [{ email: developerEmail, name: developerName }],
        subject: 'Welcome to IGRS AI Assistant Program',
        htmlContent: emailContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Brevo] Confirmation email send failed:', error);
      return {
        success: false,
        error: `Email send failed: ${error.message || response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('[Brevo] Confirmation email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Add or update contact in Brevo
 */
export async function addContactToBrevo(
  email: string,
  name: string,
  phone: string,
  isRecruiter: boolean
): Promise<BrevoResponse> {
  if (!BREVO_API_KEY) {
    console.error('[Brevo] API key not configured');
    return {
      success: false,
      error: 'Brevo API key not configured',
    };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: name.split(' ')[0],
          LASTNAME: name.split(' ').slice(1).join(' ') || '',
          PHONE: phone,
        },
        listIds: [isRecruiter ? 2 : 1], // Adjust list IDs based on your Brevo setup
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('[Brevo] Add contact failed:', error);
      return {
        success: false,
        error: `Add contact failed: ${error.message || response.statusText}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      contactId: data.id,
    };
  } catch (error) {
    console.error('[Brevo] Add contact error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
