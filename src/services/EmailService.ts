import emailjs from '@emailjs/browser';
import type { PledgeData } from './StorageService';

// EmailJS credentials
const SERVICE_ID = 'service_1ti8qkq';
const TEMPLATE_ID = 'template_ozu98ea';
const PUBLIC_KEY = 'HJF2n6CK_DGo8ImBf';

export const EmailService = {
  async sendConfirmation(data: PledgeData): Promise<void> {

    const paypalUrl = 'https://www.paypal.com/ncp/payment/C9QNCUPKWBKMU';

    const paymentInfo = {
      en: `
        <h3>How to Complete Your Payment:</h3>
        <p><strong>1. PayPal:</strong> <a href="${paypalUrl}" style="color: #e15b00; font-weight: bold;">Click here to pay via PayPal</a></p>
        <p><strong>2. TWINT:</strong> Pay via your TWINT app and include the reference code below in the remarks.</p>
        <p><strong>3. Swiss Bank Transfer:</strong><br/>
           <strong>IBAN:</strong> CH13 8080 8008 3100 4933 1<br/>
           <strong>Bank:</strong> Raiffeisenbank Freiburg Ost / Fribourg-Est (BIC: RAIFCH22XXX)<br/>
           <strong>Beneficiary:</strong> FICF - Foundation for Indian Children's Future<br/>
           <strong>Address:</strong> Stockera 3, 3186 Düdingen, Switzerland
        </p>
      `,
      fr: `
        <h3>Comment finaliser votre paiement :</h3>
        <p><strong>1. PayPal :</strong> <a href="${paypalUrl}" style="color: #e15b00; font-weight: bold;">Cliquez ici pour payer via PayPal</a></p>
        <p><strong>2. TWINT :</strong> Réglez via l'application TWINT en indiquant votre code de référence en remarque.</p>
        <p><strong>3. Virement Bancaire Suisse :</strong><br/>
           <strong>IBAN :</strong> CH13 8080 8008 3100 4933 1<br/>
           <strong>Banque :</strong> Raiffeisenbank Freiburg Ost / Fribourg-Est (BIC: RAIFCH22XXX)<br/>
           <strong>Bénéficiaire :</strong> FICF - Fondation pour l'Avenir des Enfants de l'Inde<br/>
           <strong>Adresse :</strong> Stockera 3, 3186 Guin / Düdingen, Suisse
        </p>
      `,
      de: `
        <h3>So schliessen Sie Ihre Zahlung ab:</h3>
        <p><strong>1. PayPal:</strong> <a href="${paypalUrl}" style="color: #e15b00; font-weight: bold;">Hier klicken für Zahlung via PayPal</a></p>
        <p><strong>2. TWINT:</strong> Zahlung über TWINT mit Angabe des untenstehenden Referenzcodes.</p>
        <p><strong>3. Schweizer Banküberweisung :</strong><br/>
           <strong>IBAN:</strong> CH13 8080 8008 3100 4933 1<br/>
           <strong>Bank:</strong> Raiffeisenbank Freiburg Ost / Fribourg-Est (BIC: RAIFCH22XXX)<br/>
           <strong>Begünstigter:</strong> FICF - Stiftung für die Zukunft indischer Kinder<br/>
           <strong>Adresse:</strong> Stockera 3, 3186 Düdingen, Schweiz
        </p>
      `
    };

    const lang = (data.language as 'en' | 'fr' | 'de') || 'en';
    
    const subjects = {
      en: `FICF Sponsorship Pledge Confirmation - ${data.childName} (${data.refCode})`,
      fr: `Confirmation de Parrainage FICF - ${data.childName} (${data.refCode})`,
      de: `FICF Patenschaftsbestätigung - ${data.childName} (${data.refCode})`
    };

    const greetings = {
      en: `Dear ${data.donorName},`,
      fr: `Cher(e) ${data.donorName},`,
      de: `Liebe(r) ${data.donorName},`
    };

    const bodies = {
      en: `Thank you for your generous pledge of <strong>CHF ${data.amount}</strong> to sponsor <strong>${data.childName}</strong>.<br/><br/>
           Please use the following unique reference code in your payment remarks (Bank, TWINT, or PayPal):<br/>
           <h2 style="color: #e15b00; font-family: monospace; letter-spacing: 2px;">${data.refCode}</h2>`,
      fr: `Merci pour votre généreuse promesse de don de <strong>CHF ${data.amount}</strong> pour parrainer <strong>${data.childName}</strong>.<br/><br/>
           Veuillez indiquer le code de référence suivant dans les remarques de votre paiement (Banque, TWINT ou PayPal) :<br/>
           <h2 style="color: #e15b00; font-family: monospace; letter-spacing: 2px;">${data.refCode}</h2>`,
      de: `Herzlichen Dank für Ihre großzügige Zusage von <strong>CHF ${data.amount}</strong> zur Unterstützung von <strong>${data.childName}</strong>.<br/><br/>
           Bitte verwenden Sie diesen Referenzcode bei Ihrer Zahlung (Bank, TWINT oder PayPal):<br/>
           <h2 style="color: #e15b00; font-family: monospace; letter-spacing: 2px;">${data.refCode}</h2>`
    };

    const emailContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #2d3748; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>${greetings[lang]}</h2>
        <p>${bodies[lang]}</p>
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 24px 0;" />
        ${paymentInfo[lang]}
        <br/>
        <p style="font-size: 12px; color: #718096; border-top: 1px solid #edf2f7; padding-top: 16px;">
          FICF – Foundation for Indian Children's Future<br/>
          Stockera 3, 3186 Düdingen, Switzerland • <a href="https://kingjamesgoat.github.io/FICFCharity/">Website</a>
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
      console.error('Error sending confirmation email:', error);
    }
  }
};
