export interface ChildStory {
  en: string;
  fr: string;
  de: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  location: string;
  dream: string;
  story: ChildStory;
  image: string;
}

export const children: Child[] = [
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
    image: "/FICFCharity/assets/children/efshifa.png",
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
    image: "/FICFCharity/assets/children/lizzy.png",
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
    image: "/FICFCharity/assets/children/nanki.png",
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
    image: "/FICFCharity/assets/children/raxilin.png",
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
    image: "/FICFCharity/assets/children/arsha.png",
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
    image: "/FICFCharity/assets/children/darshiya.png",
  },
];
