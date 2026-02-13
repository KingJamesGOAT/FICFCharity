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
    refCode: string; // New: Unique Reference Code
    language: string; // New: Language used during pledge
}

// Placeholder URL - User will replace this with their Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz55kLFXh9Q7e2YHzvylfKPE0C1t_21rZ_GUX5OEoQx7EY1Skk_GCK2ACFjngWKmekR/exec'; 

export const StorageService = {
  async savePledge(data: PledgeData): Promise<void> {


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
