export interface PledgeData {
    timestamp: string;
    childId: string;
    childName: string;
    donorName: string;
    email: string;
    phone?: string;
    address?: string;
    zipCity?: string;
    country?: string;
    amount: number;
    type: 'yearly' | 'one-time';
    taxReceipt: boolean;
    paymentMethod: string;
    refCode: string; // Unique Reference Code
    language: string; // Language used during pledge
}

// Active Google Apps Script Web App URL (Version 4)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzS2wUv55tuOqqWMM30X1h_sl2vUmv-oS3UlkrjlGxEwr65LQ-D9SrI-AT_8-AZREX9/exec'; 

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
      if (pin !== '090402') throw new Error('Invalid PIN');
      


      try {
          const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getPledges`);
          const data = await response.json();
          return data;
      } catch (error) {
          console.error('Error fetching pledges:', error);
          return [];
      }
  },

  async getSponsoredChildIds(): Promise<string[]> {
    try {
      const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getPledges`);
      const data = await response.json();
      if (!Array.isArray(data)) return [];

      const yearlySponsored = data
        .filter((p: any) => (p.type === 'yearly' || p.type === 'Yearly') && p.childId)
        .map((p: any) => String(p.childId).toLowerCase().trim());

      let localSponsored: string[] = [];
      try {
        localSponsored = JSON.parse(localStorage.getItem('ficf_yearly_sponsored') || '[]');
      } catch {}

      return Array.from(new Set([...yearlySponsored, ...localSponsored]));
    } catch (error) {
      console.error('Error fetching sponsored child IDs:', error);
      try {
        return JSON.parse(localStorage.getItem('ficf_yearly_sponsored') || '[]');
      } catch {
        return [];
      }
    }
  },

  recordLocalYearlySponsorship(childId: string): void {
    try {
      const current: string[] = JSON.parse(localStorage.getItem('ficf_yearly_sponsored') || '[]');
      const updated = Array.from(new Set([...current, childId.toLowerCase().trim()]));
      localStorage.setItem('ficf_yearly_sponsored', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }
};
