# PROJECT BLUEPRINT: FICF SPONSORSHIP PLATFORM (v2.0)

## 1. Executive Summary & Role

**Role:** You are a **Senior Frontend Architect** and **UI/UX Designer** specializing in high-trust, accessible, and ultra-modern React applications.
**Mission:** Build a "Greenfield" (brand new) sponsorship portal for the _Foundation for Indian Children’s Future (FICF)_.
**The "Vibe":** The website must look **Swiss-clean**, trustworthy, and expensive. Think "Private Banking meets Humanitarian Aid." Minimalist, high-contrast, generous whitespace, and silky smooth animations.
**Deadline:** The prototype must be ready for deployment immediately.

---

## 2. Technical Stack & Constraints

**Strictly adhere to this stack:**

- **Core:** React 18+ (Vite), TypeScript.
- **Styling:** Tailwind CSS (v3.4+).
- **Routing:** `react-router-dom` (v6).
- **Animations:** `framer-motion` (for entry animations and hover states).
- **Icons:** `lucide-react` (Use thin, elegant strokes).
- **Email:** `@emailjs/browser` (for the form submission).
- **Font Loading:** You must inject Google Fonts via CSS import.
- **Images:** Local assets in `public/`.

---

## 3. Design System (The "Look & Feel")

### **A. Typography**

- **Headings:** _Playfair Display_ (Serif). Used for "Trust" and "Tradition".
- Weights: 600, 700.

- **Body:** _Inter_ (Sans-serif). Used for "Clarity" and "Modernity".
- Weights: 400, 500.

### **B. Color Palette (Tailwind Config)**

Extend the Tailwind config with these specific values:

- `primary`: `#E85D04` (Deep Saffron - Energetic but serious).
- `primary-hover`: `#D94E00`.
- `secondary`: `#1F2937` (Charcoal - softer than black).
- `background`: `#FAFAFA` (Alabaster - warm white, never pure `#FFFFFF`).
- `surface`: `#FFFFFF` (Pure white for cards).
- `muted`: `#9CA3AF` (For secondary text).

### **C. Visual Effects**

- **Glassmorphism:** Use `backdrop-blur-md bg-white/80` for the Navbar.
- **Shadows:** Soft, diffused shadows: `shadow-[0_8px_30px_rgb(0,0,0,0.04)]`.
- **Radius:** `rounded-2xl` for cards, `rounded-full` for buttons.

---

## 4. File Architecture

Generate this exact folder structure:

```text
src/
├── assets/
│   ├── children/    (Store child images here)
│   └── payment/     (Store QR codes here)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Modal.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── ChildGrid.tsx
│       └── PaymentInstructions.tsx
├── contexts/
│   └── LanguageContext.tsx
├── data/
│   └── children.ts
├── hooks/
│   └── useScrollPosition.ts
├── locales/
│   └── translations.ts
├── pages/
│   ├── Home.tsx
│   └── Success.tsx
└── main.tsx

```

---

## 5. Detailed Component Specifications

### **1. Navbar (`Navbar.tsx`)**

- **Behavior:** Fixed to top (`fixed w-full z-50`).
- **Transition:** Transparent at top, becomes `bg-white/90 shadow-sm` after scrolling 20px.
- **Logo:** Text "FICF" in _Playfair Display_, Bold, 24px.
- **Language Switcher:** A simple pill-shaped toggle: `EN | FR | DE`. Active language is bold.
- **Mobile:** Hamburger menu opens a full-screen white overlay with large animated links.

### **2. Hero Section (`Hero.tsx`)**

- **Layout:** Split screen (Desktop) or Centered (Mobile).
- **Background:** If no image is available, use a CSS gradient: `bg-gradient-to-br from-orange-50 to-orange-100`.
- **Content:**
- **H1:** Large Serif font (text-5xl md:text-7xl).
- **Subtext:** "Help us raise CHF 10,000 to sponsor 25 children."
- **Progress Bar:** A sleek visual bar.
- _Design:_ Height 8px, gray background, orange fill.
- _Label:_ "CHF 0 / CHF 10,000".

- **CTA:** Button "Meet the Children" -> smooth scrolls to `#catalog`.

### **3. The Catalog Grid (`ChildGrid.tsx`)**

- **Container:** `max-w-7xl mx-auto px-6 py-20`.
- **Grid:** Responsive (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`).
- **The Child Card:**
- **Animation:** `motion.div` with `whileHover={{ y: -10 }}`.
- **Image:** Aspect Ratio `4:5`. Object fit cover.
- _Fallback:_ If image fails, show a gray div with the child's initials.

- **Content:**
- Name (Serif, Bold, lg).
- Location (Icon: MapPin, text-sm, muted).
- Dream (Icon: Star, text-sm, text-primary).

- **Action:** Button "Sponsor Me" (Outline style on card, Solid style on hover).

### **4. Sponsorship Modal (`Modal.tsx`)**

- **UX:** When opened, the background dims (`bg-black/40 backdrop-blur-sm`).
- **Content:**
- **Left Col:** Child's photo and full story (scrollable).
- **Right Col:** The Form.

- **Form Logic:**
- **Radio Group:** "Annual Sponsorship (CHF 360)" vs "One-time Donation".
- **Inputs:** Name (Text), Email (Email), Address (Textarea).
- **Checkbox:** "I require a tax receipt."
- **Payment Method:** "Bank Transfer" OR "Twint".
- **Submit:** Validates fields -> Calls EmailJS -> Redirects to `/success`.

### **5. Success / Payment Page (`Success.tsx`)**

- **Vibe:** Celebration. "Thank You" message.
- **Critical Info:** This is where the user ACTUALLY pays.
- **Layout:** Two distinct cards side-by-side.
- **Card A: Bank Transfer**
- Show QR-Bill Image.
- "Copy IBAN" button (copies to clipboard).

- **Card B: TWINT**
- Show Twint QR Code.
- **Alert:** Red/Orange text: _"You must enter the amount manually in the app."_

---

## 6. Data & Content (Do Not Hallucinate - Use This Exact Data)

**File:** `src/data/children.ts`

```typescript
export const children = [
  {
    id: "efshifa",
    name: "Efshifa",
    age: 9,
    location: "Palani, Tamil Nadu",
    dream: "Teacher",
    story: {
      en: "Efshifa is a bright student in class 5. Her father is a driver struggling with daily wages. She loves Social Science and dreams of becoming a teacher to help others.",
      fr: "Efshifa est une élève brillante en 5ème classe. Son père est chauffeur et peine avec un salaire journalier. Elle adore les sciences sociales et rêve de devenir enseignante.",
      de: "Efshifa ist eine aufgeweckte Schülerin der 5. Klasse. Ihr Vater ist Fahrer und kämpft mit dem Tageslohn. Sie liebt Sozialkunde und träumt davon, Lehrerin zu werden.",
    },
    image: "/assets/children/efshifa.jpg",
  },
  {
    id: "lizzy",
    name: "Lizzy Temina",
    age: 6,
    location: "Palani, Tamil Nadu",
    dream: "Education",
    story: {
      en: "Lizzy is an enthusiastic student in class 1. Her father is a social worker and the sole breadwinner, finding it difficult to pay school fees for two children.",
      fr: "Lizzy est une élève enthousiaste en 1ère classe. Son père est travailleur social et seul soutien de famille, éprouvant des difficultés à payer les frais de scolarité.",
      de: "Lizzy ist eine begeisterte Schülerin der 1. Klasse. Ihr Vater ist Sozialarbeiter und der alleinige Ernährer, der Schwierigkeiten hat, das Schulgeld zu bezahlen.",
    },
    image: "/assets/children/lizzy.jpg",
  },
  {
    id: "nanki",
    name: "Nanki",
    age: 8,
    location: "Alirajpur, MP",
    dream: "Family Support",
    story: {
      en: "Nanki is a semi-orphan from a tribal family. Her father passed away two years ago, and her mother struggles alone to raise five children.",
      fr: "Nanki est semi-orpheline issue d'une famille tribale. Son père est décédé il y a deux ans et sa mère lutte seule pour élever cinq enfants.",
      de: "Nanki ist eine Halbwaise aus einer Stammesfamilie. Ihr Vater starb vor zwei Jahren, und ihre Mutter kämpft allein, um fünf Kinder großzuziehen.",
    },
    image: "/assets/children/nanki.jpg",
  },
  {
    id: "raxilin",
    name: "Raxilin Ashira",
    age: 9,
    location: "Kanyakumari, TN",
    dream: "Student",
    story: {
      en: "Raxilin's father passed away from a sudden heart attack. Her mother is now a daily wage worker struggling to educate her two children.",
      fr: "Le père de Raxilin est décédé d'une crise cardiaque. Sa mère est maintenant travailleuse journalière et peine à éduquer ses deux enfants.",
      de: "Raxilins Vater starb an einem Herzinfarkt. Ihre Mutter ist nun Tagelöhnerin und hat Mühe, ihre zwei Kinder auszubilden.",
    },
    image: "/assets/children/raxilin.jpg",
  },
  {
    id: "arsha",
    name: "Arsha A. V",
    age: 6,
    location: "Kanyakumari, TN",
    dream: "Student",
    story: {
      en: "Arsha's father, a mason, passed away from pneumonia. Her mother faces immense challenges providing for the family with no steady income.",
      fr: "Le père d'Arsha, maçon, est décédé d'une pneumonie. Sa mère fait face à d'immenses défis pour subvenir aux besoins de la famille.",
      de: "Arshas Vater, ein Maurer, starb an einer Lungenentzündung. Ihre Mutter steht vor großen Herausforderungen, die Familie zu versorgen.",
    },
    image: "/assets/children/arsha.jpg",
  },
  {
    id: "darshiya",
    name: "V. N. Darshiya",
    age: 15,
    location: "Tamil Nadu",
    dream: "Doctor (MBBS)",
    story: {
      en: "Darshiya loves painting and gardening. She wants to become a doctor (MBBS) to serve her community. She values hard work and personal growth.",
      fr: "Darshiya aime la peinture et le jardinage. Elle veut devenir médecin (MBBS) pour servir sa communauté. Elle valorise le travail acharné.",
      de: "Darshiya liebt Malen und Gärtnern. Sie möchte Ärztin (MBBS) werden, um ihrer Gemeinschaft zu dienen. Sie schätzt harte Arbeit.",
    },
    image: "/assets/children/darshiya.jpg",
  },
];
```

**File:** `src/locales/translations.ts`

```typescript
export const translations = {
  en: {
    nav: {
      home: "Home",
      meet: "Meet the Children",
      donate: "Donate",
      contact: "Contact",
    },
    hero: {
      title: "Building Futures",
      subtitle: "Help us raise CHF 10,000 for 25 children.",
      cta: "Sponsor a Child",
    },
    filters: { all: "All Children", urgent: "Urgent Need" },
    card: { age: "years old", sponsor_btn: "Sponsor Me" },
    modal: {
      title: "Sponsorship Pledge",
      step1: "Select Amount",
      step2: "Your Details",
      option_full: "Yearly Sponsorship (CHF 360)",
      option_any: "One-time Donation",
      label_name: "Full Name",
      label_email: "Email Address",
      label_tax: "I need a tax receipt",
      btn_submit: "Confirm Pledge",
    },
    success: {
      title: "Thank You!",
      subtitle:
        "Your pledge has been recorded. Please complete the donation below.",
      bank_title: "Bank Transfer",
      twint_title: "TWINT Payment",
      twint_alert: "Important: Enter the amount manually in your app.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      meet: "Les Enfants",
      donate: "Faire un don",
      contact: "Contact",
    },
    hero: {
      title: "Construire l'Avenir",
      subtitle: "Aidez-nous à lever CHF 10'000 pour 25 enfants.",
      cta: "Parrainer",
    },
    filters: { all: "Tous les enfants", urgent: "Besoin Urgent" },
    card: { age: "ans", sponsor_btn: "Parrainer" },
    modal: {
      title: "Promesse de Parrainage",
      step1: "Montant",
      step2: "Vos Coordonnées",
      option_full: "Parrainage Annuel (CHF 360)",
      option_any: "Don Unique",
      label_name: "Nom Complet",
      label_email: "Adresse E-mail",
      label_tax: "Je souhaite une attestation fiscale",
      btn_submit: "Confirmer",
    },
    success: {
      title: "Merci !",
      subtitle:
        "Votre promesse est enregistrée. Veuillez procéder au paiement ci-dessous.",
      bank_title: "Virement Bancaire",
      twint_title: "Paiement TWINT",
      twint_alert:
        "Important : Entrez le montant manuellement dans l'application.",
    },
  },
  de: {
    nav: {
      home: "Startseite",
      meet: "Die Kinder",
      donate: "Spenden",
      contact: "Kontakt",
    },
    hero: {
      title: "Zukunft Bauen",
      subtitle: "Helfen Sie uns, CHF 10'000 für 25 Kinder zu sammeln.",
      cta: "Pate werden",
    },
    filters: { all: "Alle Kinder", urgent: "Dringend" },
    card: { age: "Jahre alt", sponsor_btn: "Pate werden" },
    modal: {
      title: "Patenschaftszusage",
      step1: "Betrag Wählen",
      step2: "Ihre Daten",
      option_full: "Jahrespatenschaft (CHF 360)",
      option_any: "Einmalige Spende",
      label_name: "Vollständiger Name",
      label_email: "E-Mail-Adresse",
      label_tax: "Ich brauche eine Spendenbescheinigung",
      btn_submit: "Bestätigen",
    },
    success: {
      title: "Danke!",
      subtitle:
        "Ihre Zusage wurde registriert. Bitte nutzen Sie die Zahlungsdetails unten.",
      bank_title: "Banküberweisung",
      twint_title: "TWINT Zahlung",
      twint_alert: "Wichtig: Betrag manuell in der App eingeben.",
    },
  },
};
```

---

## 7. Execution Order (Step-by-Step)

1. **Initialize Project:** Setup Vite, Tailwind, install dependencies (`framer-motion`, `lucide-react`, `react-router-dom`).
2. **Styles:** Configure `tailwind.config.js` with the colors and fonts defined above. Import Google Fonts in `index.css`.
3. **Core Components:** Build `Navbar` (with language logic) and `Footer`.
4. **Pages:**

- Build `Home.tsx` containing `Hero` and `ChildGrid`.
- Build the `SponsorModal` (ensure it handles form state correctly).
- Build `Success.tsx` with the payment assets.

5. **Interactions:** Add the hover effects and smooth scrolling.
6. **Responsiveness:** Verify the grid collapses to 1 column on mobile.

**Start coding immediately. Do not ask for clarification. Assume these specifications are final.**
