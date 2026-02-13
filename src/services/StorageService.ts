export interface PledgeData {
    timestamp: string;
    childId: string;
    childName: string;
    donorName: string;
    email: string;
    amount: number;
    type: 'yearly' | 'one-time';
    taxReceipt: boolean;
    paymentMethod: string;
}

// Placeholder URL - User will replace this with their Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'; 

export const StorageService = {
  async savePledge(data: PledgeData): Promise<void> {
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      console.warn('Google Script URL not set. Data not saved to sheet.');
      return; 
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // standard for Google Apps Script simple triggers
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error saving pledge:', error);
      throw error;
    }
  },

  async getStats(): Promise<{ totalRaised: number; donorCount: number }> {
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      return { totalRaised: 0, donorCount: 0 };
    }

    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getStats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { totalRaised: 0, donorCount: 0 };
    }
  },

  async getPledges(pin: string): Promise<PledgeData[]> {
      // client-side simple check for now, real check happens if we wanted secure backend
      if (pin !== '1234') throw new Error('Invalid PIN');
      
      if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
          return [];
      }

      try {
          const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getPledges`);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching pledges:', error);
          return [];
      }
  }
};
