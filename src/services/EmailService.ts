import emailjs from '@emailjs/browser';
import type { PledgeData } from './StorageService';

// Placeholder Keys - User will replace these
const SERVICE_ID = 'service_1ti8qkq';
const TEMPLATE_ID = 'template_ozu98ea';
const PUBLIC_KEY = '6crwj6TVmkecWjMwj7cfT';

export const EmailService = {
  async sendConfirmation(data: PledgeData): Promise<void> {


    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_name: data.donorName, // Matches typical EmailJS template variable
          to_email: data.email,       // Matches typical EmailJS template variable
          child_name: data.childName,
          amount: data.amount,
          type: data.type === 'yearly' ? 'Yearly Sponsorship' : 'One-time Donation',
          tax_receipt: data.taxReceipt ? 'Yes' : 'No',
        },
        PUBLIC_KEY
      );
    } catch (error) {
      console.error('Error sending email:', error);
      // We don't throw here to avoid blocking the user flow if email fails
    }
  }
};
