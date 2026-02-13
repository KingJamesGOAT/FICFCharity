import emailjs from '@emailjs/browser';
import type { PledgeData } from './StorageService';

// Placeholder Keys - User will replace these
const SERVICE_ID = 'service_1ti8qkq';
const TEMPLATE_ID = 'template_ozu98ea';
const PUBLIC_KEY = '6crwj6TVmkecWjMwj7cfT';

export const EmailService = {
  async sendConfirmation(data: PledgeData): Promise<void> {

    // Bank Details based on Language
    const bankDetails = {
      en: `
        <h3>Bank Transfer Details</h3>
        <p>
          <strong>Account:</strong> CH13 8080 8008 3100 4933 1<br/>
          <strong>Beneficiary:</strong> FICF - Foundation for Indian Children's Future<br/>
          <strong>Address:</strong> Stockera 3, 3186 Düdingen
        </p>
      `,
      fr: `
        <h3>Coordonnées Bancaires</h3>
        <p>
          <strong>Compte :</strong> CH13 8080 8008 3100 4933 1<br/>
          <strong>Bénéficiaire :</strong> FICF - Foundation for Indian Children's Future<br/>
          <strong>Adresse :</strong> Stockera 3, 3186 Düdingen
        </p>
      `,
      de: `
        <h3>Bankverbindung</h3>
        <p>
          <strong>Konto:</strong> CH13 8080 8008 3100 4933 1<br/>
          <strong>Begünstigter:</strong> FICF - Foundation for Indian Children's Future<br/>
          <strong>Adresse:</strong> Stockera 3, 3186 Düdingen
        </p>
      `
    };

    // Construct Email Content
    const lang = (data.language as 'en' | 'fr' | 'de') || 'en';
    
    const subjects = {
      en: `Sponsorship Confirmation - ${data.childName}`,
      fr: `Confirmation de Parrainage - ${data.childName}`,
      de: `Patenschaftsbestätigung - ${data.childName}`
    };

    const greetings = {
      en: `Dear ${data.donorName},`,
      fr: `Cher(e) ${data.donorName},`,
      de: `Liebe(r) ${data.donorName},`
    };

    const bodies = {
      en: `Thank you for your generous pledge of <strong>CHF ${data.amount}</strong> to support <strong>${data.childName}</strong>.<br/><br/>
           Please use the following reference code in your payment remarks (Bank or TWINT):<br/>
           <h2 style="color: #e15b00;">${data.refCode}</h2>`,
      fr: `Merci pour votre généreuse promesse de don de <strong>CHF ${data.amount}</strong> pour soutenir <strong>${data.childName}</strong>.<br/><br/>
           Veuillez utiliser le code de référence suivant dans les remarques de votre paiement (Banque ou TWINT) :<br/>
           <h2 style="color: #e15b00;">${data.refCode}</h2>`,
      de: `Vielen Dank für Ihre großzügige Spende von <strong>CHF ${data.amount}</strong> zur Unterstützung von <strong>${data.childName}</strong>.<br/><br/>
           Bitte verwenden Sie den folgenden Referenzcode in Ihren Zahlungsbemerkungen (Bank oder TWINT):<br/>
           <h2 style="color: #e15b00;">${data.refCode}</h2>`
    };

    const emailContent = `
      <div style="font-family: sans-serif; color: #333;">
        <h2>${greetings[lang]}</h2>
        <p>${bodies[lang]}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        ${bankDetails[lang]}
        <br/>
        <p style="font-size: 12px; color: #888;">
          FICF - Foundation for Indian Children's Future<br/>
          Stockera 3, 3186 Düdingen
        </p>
      </div>
    `;

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          subject: subjects[lang],
          email_content: emailContent,
          to_email: data.email,
          to_name: data.donorName,
        },
        PUBLIC_KEY
      );
    } catch (error) {
      console.error('Error sending email:', error);
      // We don't throw here to avoid blocking the user flow if email fails
    }
  }
};
