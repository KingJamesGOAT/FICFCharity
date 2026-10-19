export interface ChildStory {
  en: string;
  fr: string;
  de: string;
}

export type ChildCategory = 'university' | 'school';

export interface Child {
  id: string;
  name: string;
  age: number;
  dob: string;
  location: string;
  education: string;
  category: ChildCategory;
  recommendedAmount: number;
  dream: string;
  story: ChildStory;
  image: string;
}

const rawChildren: Child[] = [
  {
    id: "jarwis",
    name: "S. Jarwis John",
    age: 7,
    dob: "10 May 2019",
    location: "Palani, Tamil Nadu",
    education: "Class 2, Municipal School",
    category: "school",
    recommendedAmount: 360,
    dream: "Primary Schooling & Family Care",
    story: {
      en: "Jarwis is a 7-year-old boy living with his parents, two older siblings, and grandparents in Palani, Tamil Nadu. He studies in Class 2 at a Government Municipal School. His father is a daily wage laborer working in a shop, while his mother is a homemaker. His father is the sole provider, and his grandparents suffer from chronic sickness requiring medication. The family struggles deeply with poverty and lacks even basic lavatory facilities. His father approached FICF to request financial support for Jarwis’s education.",
      fr: "Jarwis est un garçon de 7 ans vivant avec ses parents, ses deux frères et sœurs aînés et ses grands-parents à Palani, Tamil Nadu. Il étudie en 2ème classe dans une école municipale publique. Son père est travailleur journalier dans un magasin et sa mère est au foyer. Son père est le seul soutien de famille, tandis que ses grands-parents sont malades et ont besoin de soins réguliers. La famille lutte contre la pauvreté et ne dispose même pas de sanitaires de base. Son père a sollicité la FICF pour financer la scolarité de Jarwis.",
      de: "Jarwis ist ein 7-jähriger Junge, der mit seinen Eltern, zwei älteren Geschwistern und den Großeltern in Palani, Tamil Nadu, lebt. Er besucht die 2. Klasse einer städtischen Schule. Sein Vater arbeitet als Tagelöhner in einem Geschäft, seine Mutter führt den Haushalt. Der Vater ist der alleinige Ernährer, und die Großeltern sind chronisch krank und auf Medikamente angewiesen. Die Familie leidet unter bitterer Armut und verfügt nicht einmal über eine eigene Sanitäranlage. Der Vater wandte sich an die FICF, um Unterstützung für Jarwis' Schulbildung zu erhalten."
    },
    image: "/FICFCharity/assets/children/jarwis.png",
  },
  {
    id: "shakklin",
    name: "S. Shakklin",
    age: 19,
    dob: "25 June 2007",
    location: "Kanyakumari, Tamil Nadu",
    education: "2nd Year B.E. Computer Science",
    category: "university",
    recommendedAmount: 500,
    dream: "Software Engineer (B.E.)",
    story: {
      en: "Shakklin is 19 years old, currently in her second year of a Bachelor of Engineering degree in Computer Science in Kanyakumari, Tamil Nadu. She lives with her parents and older sister. Her father suffers from alcoholism, does not work, and takes no responsibility for the family. In addition, the family resides in a home severely damaged by a cyclone. Despite facing health setbacks in the past, Shakklin persevered with resilience. Her mother reached out to FICF requesting vital educational support so Shakklin can complete her engineering degree.",
      fr: "Shakklin a 19 ans et est en deuxième année d'ingénierie en informatique à Kanyakumari, Tamil Nadu. Elle vit avec ses parents et sa sœur aînée. Son père souffre d'alcoolisme, ne travaille pas et n'assume aucune responsabilité financière. La famille vit dans une maison endommagée par un cyclone. Malgré de graves problèmes de santé surmontés avec courage, Shakklin poursuit ses études avec détermination. Sa mère a contacté la FICF pour demander une aide financière indispensable à l'obtention de son diplôme d'ingénieur.",
      de: "Shakklin ist 19 Jahre alt und studiert im zweiten Jahr Informatik (Bachelor of Engineering) in Kanyakumari, Tamil Nadu. Sie lebt mit ihren Eltern und ihrer älteren Schwester. Ihr Vater leidet unter Alkoholismus, arbeitet nicht und übernimmt keinerlei Verantwortung für die Familie. Das Wohnhaus der Familie wurde zudem durch einen Wirbelsturm beschädigt. Trotz früherer gesundheitlicher Rückschläge kämpft Shakklin entschlossen für ihre Zukunft. Ihre Mutter wandte sich an die FICF, um Unterstützung für ihr Informatikstudium zu erbitten."
    },
    image: "/FICFCharity/assets/children/shakklin.png",
  },
  {
    id: "darina",
    name: "S. Darina",
    age: 19,
    dob: "15 March 2007",
    location: "Eladaiyadivilai, Tamil Nadu",
    education: "Higher Education Aspirant",
    category: "university",
    recommendedAmount: 500,
    dream: "University Higher Education",
    story: {
      en: "Darina is a 19-year-old orphan girl living with her uncle's family in Eladaiyadivilai, Kanyakumari District. Having lost her parents, she lives with her uncle, aunt, cousin, and grandmother. Having completed her secondary schooling, she is eager to pursue higher education. Darina is deeply concerned about placing an overwhelming financial burden on her uncle's modest household, and humbly seeks sponsorship to achieve her academic aspirations and build an independent future.",
      fr: "Darina est une jeune orpheline de 19 ans vivant avec la famille de son oncle à Eladaiyadivilai, Kanyakumari. Ayant perdu ses parents, elle habite avec son oncle, sa tante, sa cousine et sa grand-mère. Ayant achevé ses études secondaires, elle souhaite ardemment poursuivre des études supérieures. Inquiète de représenter une charge financière trop lourde pour le foyer modeste de son oncle, elle sollicite humblement un parrainage pour continuer ses études universitaires.",
      de: "Darina ist eine 19-jährige Vollwaise, die bei der Familie ihres Onkels in Eladaiyadivilai, Kanyakumari, lebt. Nach dem Verlust ihrer Eltern lebt sie mit ihrem Onkel, ihrer Tante, ihrer Cousine und ihrer Großmutter zusammen. Nach erfolgreichem Schulabschluss möchte sie unbedingt ein Hochschulstudium aufnehmen. Um ihren Onkel nicht finanziell zu überlasten, bittet sie um Patenschaftsunterstützung, um ihren Bildungsweg fortzusetzen und eine eigenständige Zukunft aufzubauen."
    },
    image: "/FICFCharity/assets/children/darina.png",
  },
  {
    id: "jershika",
    name: "V. J. Jershika",
    age: 16,
    dob: "23 February 2010",
    location: "Kanyakumari, Tamil Nadu",
    education: "Class 9, C.S.I Matriculation School",
    category: "school",
    recommendedAmount: 360,
    dream: "Academic Excellence & Higher Studies",
    story: {
      en: "Jershika is 16 years old, studying in the 9th standard at C.S.I Hacker Matriculation School near her home. She lives with her mother and grandmother in Kanyakumari. Her father passed away ten years ago from jaundice. Her mother works as a saleswoman in a local textile shop, earning a meager income. Despite immense economic hardship, her mother is determined to give Jershika a quality education and approached FICF for assistance.",
      fr: "Jershika a 16 ans et étudie en 9ème classe à l'école C.S.I Hacker Matriculation près de chez elle. Elle vit avec sa mère et sa grand-mère à Kanyakumari. Son père est décédé il y a dix ans d'une jaunisse. Sa mère travaille comme vendeuse dans un magasin de textile local avec un salaire modeste. Malgré les difficultés économiques, sa mère souhaite ardemment offrir à Jershika une éducation de qualité et a sollicité l'aide de la FICF.",
      de: "Jershika ist 16 Jahre alt und besucht die 9. Klasse der C.S.I Hacker Matriculation School. Sie lebt mit ihrer Mutter und Großmutter in Kanyakumari. Ihr Vater verstarb vor zehn Jahren an Gelbsucht. Ihre Mutter arbeitet als Verkäuferin in einem Textilgeschäft mit geringem Einkommen. Trotz schwerer finanzieller Not setzt ihre Mutter alles daran, Jershika eine gute Schulbildung zu ermöglichen, und bat die FICF um Unterstützung."
    },
    image: "/FICFCharity/assets/children/jershika.png",
  },
  {
    id: "subhiksha",
    name: "P. Subhiksha",
    age: 16,
    dob: "23 March 2010",
    location: "Cherupaloor, Tamil Nadu",
    education: "Class 11, Arunachalam Higher Sec School",
    category: "school",
    recommendedAmount: 360,
    dream: "High School Completion & College",
    story: {
      en: "Subhiksha is 16 years old, studying in Class 11 at Arunachalam Higher Secondary School. She lives with her mother and younger brother in a modest home in Cherupaloor, Kanyakumari. Her father abandoned the family years ago, leaving her mother as the sole caregiver. Her mother works irregular daily wage jobs and struggles to meet schooling and household costs. Subhiksha is committed to her studies and needs support to finish high school.",
      fr: "Subhiksha a 16 ans et est en 11ème classe à l'école secondaire supérieure Arunachalam. Elle vit avec sa mère et son jeune frère dans une modeste maison à Cherupaloor, Kanyakumari. Son père ayant abandonné la famille, sa mère assume seule toutes les responsabilités grâce à des emplois journaliers précaires. Subhiksha est très investie dans ses études et a besoin d'un parrainage pour terminer sa scolarité.",
      de: "Subhiksha ist 16 Jahre alt und besucht die 11. Klasse der Arunachalam Higher Secondary School. Sie lebt mit ihrer Mutter und ihrem jüngeren Bruder in Cherupaloor, Kanyakumari. Ihr Vater hat die Familie verlassen, sodass ihre Mutter als Tagelöhnerin allein für die Familie sorgt. Subhiksha lernt sehr fleißig und benötigt Unterstützung, um ihren Schulabschluss erfolgreich zu meistern."
    },
    image: "/FICFCharity/assets/children/subhiksha.jpg",
  },
  {
    id: "adlin",
    name: "M. Adlin Monika",
    age: 16,
    dob: "17 October 2010",
    location: "Kanyakumari, Tamil Nadu",
    education: "Class 9, Saint Lawrence School",
    category: "school",
    recommendedAmount: 360,
    dream: "Secondary Studies & Community Work",
    story: {
      en: "Adlin Monika is 16 years old and studies in Class 9 at Saint Lawrence Higher Secondary School. She lives with her mother and younger sister. Her father passed away suddenly from heart disease, leaving the family without steady support. Her mother does home-based tailor and daily wage work, struggling to feed the family and pay school fees. Sponsorship will allow Adlin to continue her education uninterrupted.",
      fr: "Adlin Monika a 16 ans et étudie en 9ème classe à l'école secondaire supérieure Saint Lawrence. Elle vit avec sa mère et sa jeune sœur. Son père est décédé subitement d'une maladie cardiaque. Sa mère travaille comme couturière à domicile et fait des travaux journaliers pour subvenir aux besoins élémentaires et payer les frais scolaires. Un parrainage permettra à Adlin de poursuivre ses études.",
      de: "Adlin Monika ist 16 Jahre alt und geht in die 9. Klasse der Saint Lawrence Higher Secondary School. Sie lebt mit ihrer Mutter und jüngeren Schwester zusammen. Ihr Vater verstarb plötzlich an einer Herzerkrankung. Die Mutter hält die Familie mit Gelegenheitsnäharbeiten und Tagelohn über Wasser. Eine Patenschaft ermöglicht Adlin den weiteren Schulbesuch."
    },
    image: "/FICFCharity/assets/children/adlin.png",
  },
  {
    id: "arsha",
    name: "S. J. Arsha",
    age: 13,
    dob: "16 December 2013",
    location: "Kattathurai, Tamil Nadu",
    education: "Class 7 / Middle School",
    category: "school",
    recommendedAmount: 360,
    dream: "Education & Caring for Sick Father",
    story: {
      en: "Arsha is 13 years old, living with her parents and siblings in Kattathurai. Her father, previously a daily wage laborer, suffered severe spinal cord damage that left him completely bedridden and dependent on round-the-clock care. With no family income, her mother cares for her invalid husband and the children under profound emotional and financial distress. FICF support is desperately needed to keep Arsha in school.",
      fr: "Arsha a 13 ans et vit avec ses parents et ses frères et sœurs à Kattathurai. Son père, ancien travailleur journalier, a subi de graves lésions à la moelle épinière qui le rendent totalement alité et dépendant. Privée de revenus, sa mère s'occupe de son mari invalide et des enfants dans une détresse extrême. Le soutien de la FICF est indispensable pour maintenir Arsha à l'école.",
      de: "Arsha ist 13 Jahre alt und lebt mit ihren Eltern und Geschwistern in Kattathurai. Ihr Vater, früher Tagelöhner, erlitt eine schwere Rückenmarksverletzung, ist vollständig bettlägerig und rund um die Uhr pflegebedürftig. Ohne Einkommen versorgt die Mutter ihren schwerkranken Mann und die Kinder unter größter Not. Eine Patenschaft sichert Arshas Schulbildung."
    },
    image: "/FICFCharity/assets/children/arsha.png",
  },
  {
    id: "jeffy",
    name: "Jeffy George",
    age: 20,
    dob: "1 August 2006",
    location: "Kanyakumari, Tamil Nadu",
    education: "Higher Education / Healthcare Studies",
    category: "university",
    recommendedAmount: 500,
    dream: "Healthcare Professional",
    story: {
      en: "Jeffy George is 20 years old, pursuing higher education in healthcare. Raised by hardworking parents with very low agricultural income, his family cannot bear the tuition costs of college education. Jeffy is disciplined and passionate about serving in the medical sector. Sponsorship will empower him to complete his degree and uplift his family.",
      fr: "Jeffy George a 20 ans et poursuit des études supérieures dans le domaine de la santé. Élevé par des parents modestes vivant de faibles revenus agricoles, sa famille ne peut assumer les frais universitaires. Jeffy est appliqué et désireux de servir dans le secteur médical. Un parrainage lui permettra d'obtenir son diplôme et d'aider les siens.",
      de: "Jeffy George ist 20 Jahre alt und absolviert eine höhere Ausbildung im Gesundheitsbereich. Seine Eltern verfügen lediglich über ein sehr geringes Einkommen aus der Landwirtschaft und können die Studiengebühren nicht aufbringen. Jeffy lernt zielstrebig und möchte im medizinischen Bereich tätig sein. Eine Patenschaft hilft ihm, sein Studium abzuschließen."
    },
    image: "/FICFCharity/assets/children/jeffy.png",
  },
  {
    id: "kelviya",
    name: "K. S. Kelviya Sherin Moses",
    age: 23,
    dob: "12 May 2003",
    location: "Nachiyarvilai, Tamil Nadu",
    education: "Final Year Medical College Student",
    category: "university",
    recommendedAmount: 500,
    dream: "Medical Doctor / Healthcare Professional",
    story: {
      en: "Kelviya Sherin is 23 years old and currently in her final year at Sree Ramakrishna Medical College. She lives with her mother and younger sister in a tiny rented room with very limited facilities. Her mother struggles alone to support two daughters. Kelviya has shown remarkable academic perseverance to reach her final year of medical training and needs vital support to pay her exam fees and complete her degree to become a practicing healthcare professional.",
      fr: "Kelviya Sherin a 23 ans et est en dernière année à l'école de médecine Sree Ramakrishna. Elle vit avec sa mère et sa jeune sœur dans une petite pièce louée aux commodités très modestes. Sa mère élève seule ses deux filles. Kelviya a fait preuve d'une persévérance exemplaire pour atteindre sa dernière année médicale et nécessite un soutien financier pour régler ses frais d'examen et devenir soignante diplômée.",
      de: "Kelviya Sherin ist 23 Jahre alt und befindet sich im Abschlussjahr am Sree Ramakrishna Medical College. Sie lebt mit ihrer Mutter und jüngeren Schwester in einem sehr kleinen Mietzimmer. Die Mutter sorgt allein für die beiden Töchter. Kelviya hat mit herausragendem Fleiß das letzte Ausbildungsjahr erreicht und benötigt Unterstützung für Prüfungs- und Studiengebühren, um als diplomierte Fachkraft im Gesundheitswesen zu arbeiten."
    },
    image: "/FICFCharity/assets/children/kelviya.png",
  },
  {
    id: "jobu",
    name: "S. Jobu Dev",
    age: 16,
    dob: "28 August 2010",
    location: "Kanyakumari, Tamil Nadu",
    education: "Class 9, Secondary School",
    category: "school",
    recommendedAmount: 360,
    dream: "Science Studies & Technical Diploma",
    story: {
      en: "Jobu Dev is 16 years old, studying in Class 9. He comes from a very poor family in Kanyakumari where his parents struggle as daily wage earners without steady work. Jobu is bright, keen on mathematics and science, and hopes to finish his secondary education to qualify for technical training.",
      fr: "Jobu Dev a 16 ans et étudie en 9ème classe. Issu d'une famille très modeste de Kanyakumari où ses parents survivent grâce à des emplois journaliers précaires, Jobu est un élève doué pour les sciences et les mathématiques. Il espère terminer sa scolarité pour suivre une formation technique.",
      de: "Jobu Dev ist 16 Jahre alt und besucht die 9. Klasse. Er stammt aus einer bedürftigen Familie in Kanyakumari, in der die Eltern als Tagelöhner ohne festes Einkommen arbeiten. Jobu begeistert sich für Mathematik und Naturwissenschaften und möchte seinen Schulabschluss für eine spätere technische Ausbildung machen."
    },
    image: "/FICFCharity/assets/children/jobu.png",
  },
  {
    id: "abima",
    name: "J. Abima",
    age: 15,
    dob: "14 November 2011",
    location: "Kanyakumari, Tamil Nadu",
    education: "Class 8, Secondary School",
    category: "school",
    recommendedAmount: 360,
    dream: "Education & Teaching Aspirations",
    story: {
      en: "Abima is 15 years old and in Class 8. Her father is a laborer with fluctuating daily wages and her mother stays at home. Due to increasing living costs and family debt, Abima’s education is at risk. She is a dedicated student who loves reading and dreams of completing her education.",
      fr: "Abima a 15 ans et est en 8ème classe. Son père est ouvrier avec des revenus journaliers irréguliers et sa mère est au foyer. Face à la hausse du coût de la vie et aux dettes familiales, la scolarité d'Abima est menacée. C'est une élève assidue qui aime lire et rêve de finir l'école.",
      de: "Abima ist 15 Jahre alt und geht in die 8. Klasse. Ihr Vater arbeitet als Hilfsarbeiter mit unregelmäßigem Lohn, ihre Mutter führt den Haushalt. Steigende Lebenshaltungskosten bedrohen Abimas Schulbesuch. Sie lernt mit großer Freude und möchte die Schule erfolgreich abschließen."
    },
    image: "/FICFCharity/assets/children/abima.png",
  },
  {
    id: "davin",
    name: "Davin Joseph Paul",
    age: 19,
    dob: "10 October 2007",
    location: "Kanyakumari, Tamil Nadu",
    education: "Higher Technical Studies",
    category: "university",
    recommendedAmount: 500,
    dream: "Technical Engineering Diploma",
    story: {
      en: "Davin Joseph Paul is 19 years old, enrolled in technical higher studies. His family faces acute financial distress following illness and debt. Davin is determined to acquire technical skills that will allow him to secure employment and lift his family out of poverty.",
      fr: "Davin Joseph Paul a 19 ans et est inscrit en études techniques supérieures. Sa famille traverse de lourdes difficultés financières suite à des maladies et dettes. Davin est déterminé à acquérir des compétences techniques pour trouver un emploi stable et soutenir sa famille.",
      de: "Davin Joseph Paul ist 19 Jahre alt und absolviert eine höhere technische Ausbildung. Seine Familie leidet unter finanzieller Not durch Krankheitskosten. Davin arbeitet engagiert daran, praktische Fachkenntnisse zu erlangen, um eine feste Arbeit zu finden und seine Familie zu unterstützen."
    },
    image: "/FICFCharity/assets/children/davin.png",
  },
  {
    id: "pavithra",
    name: "C. Pavithra",
    age: 20,
    dob: "24 March 2006",
    location: "Kanyakumari, Tamil Nadu",
    education: "Bachelor Degree College Program",
    category: "university",
    recommendedAmount: 500,
    dream: "College Graduation & Independence",
    story: {
      en: "Pavithra is 20 years old, studying for her undergraduate degree. Her father works as a daily laborer with irregular earnings. Pavithra has excelled academically against all odds and seeks sponsorship to pay for semester fees and study materials.",
      fr: "Pavithra a 20 ans et prépare sa licence universitaire. Son père est travailleur journalier aux revenus très irréguliers. Pavithra a brillamment réussi son parcours scolaire malgré les obstacles et sollicite une aide pour financer ses frais de scolarité et manuels.",
      de: "Pavithra ist 20 Jahre alt und studiert für ihren Bachelorabschluss. Ihr Vater verdient seinen Lebensunterhalt mit unregelmäßigen Gelegenheitsarbeiten. Pavithra erzielt hervorragende Leistungen und benötigt finanzielle Unterstützung für Semestergebühren und Studienunterlagen."
    },
    image: "/FICFCharity/assets/children/pavithra.png",
  },
  {
    id: "agnes",
    name: "Agnes Prodicil Bensam",
    age: 21,
    dob: "09 March 2005",
    location: "Kanyakumari, Tamil Nadu",
    education: "Bachelor of Physiotherapy",
    category: "university",
    recommendedAmount: 500,
    dream: "Certified Physiotherapist",
    story: {
      en: "Agnes is 21 years old and lives with her mother and older brother in Kanyakumari. She completed her Bachelor degree in Physiotherapy and is currently preparing for her clinical internship. Her father worked abroad in Saudi Arabia and tragically passed away during the COVID pandemic. Since then, her mother has faced immense hardship managing household needs alone. Agnes approached FICF to support the final stages of her professional qualification.",
      fr: "Agnes a 21 ans et vit avec sa mère et son frère aîné à Kanyakumari. Elle a terminé sa licence en kinésithérapie et prépare son stage clinique. Son père travaillait en Arabie saoudite et est décédé pendant la pandémie de COVID. Sa mère se bat seule pour subvenir aux besoins. Agnes a sollicité la FICF pour financer la phase finale de son diplôme professionnel.",
      de: "Agnes ist 21 Jahre alt und lebt mit ihrer Mutter und ihrem älteren Bruder in Kanyakumari. Sie hat ihr Bachelorstudium in Physiotherapie abgeschlossen und bereitet sich auf ihr klinisches Praktikum vor. Ihr Vater verstarb während der COVID-Pandemie. Seitdem bestreitet die Mutter den Lebensunterhalt allein unter großen Mühen. Agnes bittet um Unterstützung für den Abschluss ihrer Berufsausbildung."
    },
    image: "/FICFCharity/assets/children/agnes.png",
  },
  {
    id: "bennitta",
    name: "Bennitta Prabakar",
    age: 20,
    dob: "24 January 2006",
    location: "Tiruppattur / Kanyakumari",
    education: "Final Year B.Sc. Psychology",
    category: "university",
    recommendedAmount: 500,
    dream: "Psychologist & Mental Health Counselor",
    story: {
      en: "Bennitta is a 20-year-old student currently in her final year of B.Sc. Psychology at Sacred Heart College, Tiruppattur. Because college is far from her family home, she stays in the college hostel. Her family has two daughters in higher education simultaneously, creating severe financial strain. Bennitta is passionate about mental health counseling and requires sponsorship to complete her final year.",
      fr: "Bennitta est une étudiante de 20 ans en dernière année de licence de psychologie au Sacred Heart College de Tiruppattur. Éloignée de son domicile, elle réside au foyer universitaire. Sa famille compte deux filles en études supérieures en même temps, ce qui engendre une pression financière écrasante. Bennitta se destine au conseil psychologique et a besoin d'aide pour sa dernière année.",
      de: "Bennitta ist 20 Jahre alt und studiert im Abschlussjahr Psychologie (B.Sc.) am Sacred Heart College in Tiruppattur. Da das College weit von zu Hause entfernt liegt, wohnt sie im Wohnheim. Da zwei Töchter gleichzeitig studieren, ist die Familie finanziell überlastet. Bennitta möchte als Psychologin arbeiten und benötigt Hilfe für ihr letztes Studienjahr."
    },
    image: "/FICFCharity/assets/children/bennitta.png",
  },
  {
    id: "bettina",
    name: "Bettina Prabakar",
    age: 19,
    dob: "26 September 2007",
    location: "CMC Vellore / Kanyakumari",
    education: "1st Year B.Sc. Nursing, CMC Vellore",
    category: "university",
    recommendedAmount: 500,
    dream: "Registered Nurse (CMC Vellore)",
    story: {
      en: "Bettina is 19 years old, currently in her first year of B.Sc. Nursing at the prestigious College of Nursing, CMC Vellore. Living in the college hostel away from home, her nursing education requires substantial fees for tuition, uniform, and clinical equipment. With her sister Bennitta also at university, the family’s modest resources are completely exhausted. Bettina is devoted to nursing care and seeks help to continue her training.",
      fr: "Bettina a 19 ans et est en première année de soins infirmiers (B.Sc. Nursing) au prestigieux CMC Vellore. Logée en foyer étudiant, ses études nécessitent des frais importants de scolarité et de matériel clinique. Sa sœur Bennitta étant également à l'université, les ressources familiales sont épuisées. Bettina se consacre avec cœur aux soins et a besoin d'un parrainage.",
      de: "Bettina ist 19 Jahre alt und absolviert ihr erstes Ausbildungsjahr in Krankenpflege (B.Sc. Nursing) am renommierten CMC Vellore. Sie lebt im Wohnheim, und ihre Ausbildung erfordert erhebliche Mittel für Studiengebühren und Ausrüstung. Da auch ihre Schwester studiert, sind die Mittel der Familie erschöpft. Bettina bittet um Patenschaftsunterstützung für ihre Ausbildung."
    },
    image: "/FICFCharity/assets/children/bettina.png",
  },
  {
    id: "gladson",
    name: "M. Gladson Andrew",
    age: 20,
    dob: "04 June 2006",
    location: "Tamil Nadu / Kerala",
    education: "3rd Year B.Sc. Cardiac Technology",
    category: "university",
    recommendedAmount: 500,
    dream: "Cardiac Healthcare Technologist",
    story: {
      en: "Gladson is 20 years old and in the third year of his Bachelor’s degree in Cardiac Technology. He comes from a selfless missionary family that has served poor rural communities and estate workers for over 20 years without steady salary or institutional backing. With his younger brother Steve also in school, Gladson requires financial aid to complete his specialized medical training in cardiac health.",
      fr: "Gladson a 20 ans et étudie en troisième année de licence en technologie cardiaque. Il est issu d'une famille missionnaire dévouée qui sert bénévolement les communautés rurales et ouvriers agricoles depuis plus de 20 ans. Son jeune frère Steve étant également scolarisé, Gladson a besoin d'une aide financière pour finaliser sa formation médicale spécialisée.",
      de: "Gladson ist 20 Jahre alt und studiert im dritten Jahr Kardiotechnologie (Bachelor in Cardiac Technology). Er stammt aus einer engagierten Familie, die sich seit über 20 Jahren ohne festes Gehalt für ländliche Gemeinschaften einsetzt. Da sein jüngerer Bruder Steve ebenfalls die Schule besucht, benötigt Gladson Hilfe zur Finanzierung seiner medizinischen Fachausbildung."
    },
    image: "/FICFCharity/assets/children/gladson.png",
  },
  {
    id: "haristha",
    name: "S. Haristha",
    age: 8,
    dob: "06 June 2018",
    location: "Kozhipoorvilai, Tamil Nadu",
    education: "Class 2 / Primary School",
    category: "school",
    recommendedAmount: 360,
    dream: "Primary Schooling & Health Care",
    story: {
      en: "Haristha is 8 years old, living with her parents and siblings in a rented room in Kozhipoorvilai. Her father is an irregular daily wage laborer and her mother is a homemaker currently undergoing medical treatment for uterine issues. Medical expenses and volatile income make it impossible to pay school fees. Haristha needs sponsorship to remain in primary school.",
      fr: "Haristha a 8 ans et vit avec ses parents et ses frères et sœurs dans une chambre louée à Kozhipoorvilai. Son père est travailleur journalier occasionnel et sa mère est au foyer, actuellement traitée pour des ennuis de santé. Les frais médicaux empêchent le paiement des frais de scolarité. Haristha a besoin d'un parrainage pour continuer l'école primaire.",
      de: "Haristha ist 8 Jahre alt und lebt mit ihren Eltern und Geschwistern in einem gemieteten Zimmer in Kozhipoorvilai. Ihr Vater hat als Tagelöhner nur unregelmäßige Arbeit, und ihre Mutter ist in ärztlicher Behandlung. Hohe Krankheitskosten gefährden Haristhas Schulbildung, weshalb sie dringend eine Patenschaft benötigt."
    },
    image: "/FICFCharity/assets/children/haristha.png",
  },
  {
    id: "steve",
    name: "A. Steve Austin",
    age: 16,
    dob: "17 August 2010",
    location: "Tamil Nadu / Kerala",
    education: "Class 11, Higher Secondary School",
    category: "school",
    recommendedAmount: 360,
    dream: "High School Graduation & College",
    story: {
      en: "Steve is 16 years old, currently in Class 11. He lives with his missionary parents and older brother Gladson. The family has devoted over two decades to serving impoverished villagers and estate workers with very limited means. Sponsorship will enable Steve to complete high school and prepare for college.",
      fr: "Steve a 16 ans et étudie en 11ème classe. Il vit avec ses parents missionnaires et son frère aîné Gladson. La famille se consacre depuis vingt ans aux personnes démunies en milieu rural avec de très faibles moyens. Un parrainage permettra à Steve d'achever le lycée et de préparer ses études supérieures.",
      de: "Steve ist 16 Jahre alt und besucht die 11. Klasse. Er lebt mit seinen Eltern und seinem älteren Bruder Gladson. Die Familie engagiert sich seit Jahrzehnten für bedürftige Dorfgemeinschaften. Eine Patenschaft ermöglicht Steve den erfolgreichen Oberschulabschluss."
    },
    image: "/FICFCharity/assets/children/steve.png",
  },
  {
    id: "mathan",
    name: "S. Mathan Prasad",
    age: 20,
    dob: "04 April 2006",
    location: "Namakkal / Kanyakumari",
    education: "4th Year Bachelor of Architecture (B.Arch)",
    category: "university",
    recommendedAmount: 500,
    dream: "Licensed Professional Architect",
    story: {
      en: "Mathan Prasad is 20 years old, in his fourth year of a Bachelor’s Degree in Architecture near Namakkal. He finished schooling with FICF's backing. His father suffered a debilitating stroke 16 years ago, leaving his mother as the sole breadwinner. Remarkably, Mathan's twin sisters are also in college studying civil engineering. Supporting three university students simultaneously is beyond the mother's capacity. Mathan needs help to complete his final architecture coursework.",
      fr: "Mathan Prasad a 20 ans et étudie en quatrième année d'architecture (B.Arch) près de Namakkal. Ancien élève soutenu par la FICF, son père a subi un AVC il y a 16 ans, laissant sa mère seule pour nourrir la famille. Ses sœurs jumelles étudient également en école d'ingénieurs. Financer trois formations universitaires est impossible sans soutien. Mathan a besoin d'aide pour finaliser son diplôme d'architecte.",
      de: "Mathan Prasad ist 20 Jahre alt und studiert im vierten Jahr Architektur (B.Arch) bei Namakkal. Nach der Schulzeit mit FICF-Unterstützung kämpft seine Familie schwer: Der Vater erlitt vor 16 Jahren einen Schlaganfall, die Mutter sorgt allein für die Familie, während auch seine Zwillingsschwestern studieren. Drei Studiengänge gleichzeitig sind nicht finanzierbar. Mathan benötigt Unterstützung für seinen Studienabschluss."
    },
    image: "/FICFCharity/assets/children/mathan.png",
  },
  {
    id: "ramya",
    name: "S. Ramya",
    age: 17,
    dob: "30 December 2008",
    location: "Kanyakumari, Tamil Nadu",
    education: "1st Year B.E. Civil Engineering",
    category: "university",
    recommendedAmount: 500,
    dream: "Civil Engineer (B.E.)",
    story: {
      en: "Ramya is 17 years old and has begun her first year of a Bachelor’s Degree in Civil Engineering at Ponjesley College. Having completed schooling through FICF, she is eager to build a career in engineering. Her father has been partially paralyzed since a stroke 16 years ago, so her mother carries all household, medical, and education costs for three college-age siblings (Ramya, her twin sister Sowmya, and older brother Mathan). Educational support is critical for Ramya.",
      fr: "Ramya a 17 ans et a entamé sa première année d'ingénierie civile au Ponjesley College. Soutenue par la FICF pendant sa scolarité, son père est paralysé suite à un AVC survenu il y a 16 ans. Sa mère assume seule les frais du foyer, les soins médicaux et les études de trois enfants universitaires. Une bourse d'études est indispensable pour Ramya.",
      de: "Ramya ist 17 Jahre alt und studiert im ersten Jahr Bauingenieurwesen am Ponjesley College. Nach der Schule mit FICF-Hilfe möchte sie Ingenieurin werden. Ihr Vater ist seit einem Schlaganfall vor 16 Jahren gelähmt; die Mutter trägt alle Lebens-, Pflege- und Studienkosten für drei Kinder allein. Ramya benötigt dringend Unterstützung für ihr Ingenieurstudium."
    },
    image: "/FICFCharity/assets/children/ramya.png",
  },
  {
    id: "sowmya",
    name: "S. Sowmya",
    age: 17,
    dob: "30 December 2008",
    location: "Tuticorin / Kanyakumari",
    education: "1st Year B.E. Civil Engineering",
    category: "university",
    recommendedAmount: 500,
    dream: "Civil Engineer & Medical Stability",
    story: {
      en: "Sowmya is 17 years old, studying in her first year of Civil Engineering at University College of Engineering, Tuticorin. Like her twin sister Ramya, she attended school through FICF. Sowmya manages Type 1 diabetes requiring insulin injections twice daily. With an invalid father requiring therapy and three siblings in higher education, medical and college costs place immense pressure on her mother. Sponsorship will guarantee Sowmya's college tuition and health security.",
      fr: "Sowmya a 17 ans et étudie le génie civil à l'University College of Engineering de Tuticorin. Tout comme sa jumelle Ramya, elle a été scolarisée grâce à la FICF. Sowmya souffre de diabète et requiert deux injections quotidiennes d'insuline. Avec un père invalide et trois étudiants à charge, la mère est à bout de ressources. Un parrainage garantira les frais d'études et la sécurité sanitaire de Sowmya.",
      de: "Sowmya ist 17 Jahre alt und studiert im ersten Jahr Bauingenieurwesen an der University College of Engineering in Tuticorin. Wie ihre Zwillingsschwester Ramya wurde sie von der FICF gefördert. Sowmya leidet an Diabetes und benötigt täglich zwei Insulininjektionen. Angesichts des pflegebedürftigen Vaters und dreier studierender Kinder ist die Mutter finanziell überfordert. Eine Patenschaft sichert Sowmyas Ausbildung und medizinische Versorgung."
    },
    image: "/FICFCharity/assets/children/sowmya.png",
  },
  {
    id: "ashmiya",
    name: "V. Ashmiya",
    age: 13,
    dob: "26 October 2013",
    location: "Pandivilai, Tamil Nadu",
    education: "Class 8, LMS Higher Secondary School",
    category: "school",
    recommendedAmount: 360,
    dream: "Academic Excellence & Secondary Completion",
    story: {
      en: "Ashmiya is 13 years old, studying in Class 8 at LMS Higher Secondary School. She lives in her grandmother's house in Pandivilai with her parents and siblings. Her father is a daily wage laborer who frequently falls sick and has no steady employment, while her mother looks after the home. Ashmiya is a quiet, diligent girl who consistently achieves high marks in all subjects. She urgently needs sponsorship to continue her secondary education.",
      fr: "Ashmiya a 13 ans et étudie en 8ème classe à l'école LMS Higher Secondary. Elle vit dans la maison de sa grand-mère à Pandivilai avec ses parents et ses frères et sœurs. Son père, ouvrier journalier souvent malade, manque d'emploi régulier et sa mère s'occupe du foyer. Ashmiya est une élève calme et studieuse qui obtient d'excellentes notes. Elle a besoin d'un parrainage pour poursuivre ses études secondaires.",
      de: "Ashmiya ist 13 Jahre alt und besucht die 8. Klasse der LMS Higher Secondary School. Sie lebt mit ihren Eltern und Geschwistern bei der Großmutter in Pandivilai. Ihr Vater ist Tagelöhner, oft krank und ohne festes Einkommen; die Mutter hütet das Haus. Ashmiya lernt fleißig und erzielt stets beste Noten. Sie benötigt eine Patenschaft, um ihre Schulausbildung fortzusetzen."
    },
    image: "/FICFCharity/assets/children/ashmiya.png",
  },
  {
    id: "daisy",
    name: "B. Daisy",
    age: 7,
    dob: "14 February 2019",
    location: "Amreli, Gujarat",
    education: "Class 2, Sri Bhojalpara School",
    category: "school",
    recommendedAmount: 360,
    dream: "Primary Schooling & Reading",
    story: {
      en: "Daisy is 7 years old, studying in Class 2 at Sri Bhojalpara Prathmikshala in Amreli, Gujarat. She lives with her parents and two younger sisters in an impoverished community. Her mother was raised as an orphan and received no family inheritance or backing upon marriage. Daisy is eager to learn and loves attending class. A sponsorship will safeguard this young girl’s primary schooling.",
      fr: "Daisy a 7 ans et est en 2ème classe à l'école Sri Bhojalpara Prathmikshala à Amreli, Gujarat. Elle vit avec ses parents et ses deux jeunes sœurs dans un milieu très pauvre. Sa mère a grandi orpheline sans aucun soutien familial. Daisy est très enthousiaste à l'école et adore apprendre. Un parrainage protégera la scolarité de cette petite fille.",
      de: "Daisy ist 7 Jahre alt und geht in die 2. Klasse der Sri Bhojalpara Prathmikshala in Amreli, Gujarat. Sie lebt mit ihren Eltern und zwei jüngeren Schwestern in ärmlichen Verhältnissen. Ihre Mutter wuchs als Waise ohne familiären Rückhalt auf. Daisy geht mit großer Begeisterung zur Schule. Eine Patenschaft sichert die Grundschulbildung des kleinen Mädchens."
    },
    image: "/FICFCharity/assets/children/daisy.png",
  },
  {
    id: "dharshini",
    name: "V. N. Dharshini",
    age: 18,
    dob: "06 October 2008",
    location: "Kanyakumari, Tamil Nadu",
    education: "B.Sc. Nursing Aspirant (Class 12: 82%)",
    category: "university",
    recommendedAmount: 500,
    dream: "Registered Nurse (B.Sc. Nursing)",
    story: {
      en: "Dharshini is 18 years old and lives with her mother and siblings in Kanyakumari. Five years ago, her father abandoned the family. Her mother works grueling daily wage jobs to keep the household sheltered. Dharshini worked tirelessly to pass her Class 12 exams at Amala Convent with an outstanding 82% mark, and has now qualified for a Bachelor’s degree in Nursing. Her mother cannot afford college tuition, and Dharshini needs a sponsor to begin her nursing journey.",
      fr: "Dharshini a 18 ans et vit avec sa mère et ses frères et sœurs à Kanyakumari. Il y a cinq ans, son père a abandonné le foyer. Sa mère effectue de pénibles travaux journaliers pour subvenir à leurs besoins. Dharshini a brillamment réussi son baccalauréat au couvent Amala avec 82 % de réussite et a été admise en licence de soins infirmiers. Sa mère ne pouvant financer l'université, Dharshini a besoin d'un parrain pour commencer sa formation d'infirmière.",
      de: "Dharshini ist 18 Jahre alt und lebt mit ihrer Mutter und den Geschwistern in Kanyakumari. Vor fünf Jahren verließ der Vater die Familie. Die Mutter verrichtet harte Tagelohnarbeiten, um die Familie durchzubringen. Dharshini schloss die 12. Klasse an der Amala-Schule mit herausragenden 82 % ab und ist für das Studium der Krankenpflege (B.Sc.) zugelassen. Da die Mutter die Studiengebühren nicht aufbringen kann, benötigt Dharshini eine Patenschaft, um ihre Ausbildung zur Krankenschwester zu starten."
    },
    image: "/FICFCharity/assets/children/dharshini.png",
  },
  {
    id: "ansiga",
    name: "G. L. Ansiga",
    age: 12,
    dob: "20 February 2015",
    location: "Pilankalai, Tamil Nadu",
    education: "Class 6, Government High School",
    category: "school",
    recommendedAmount: 360,
    dream: "Secondary Studies & Future Security",
    story: {
      en: "Ansiga is 12 years old, studying in Class 6 at Government High School, Moolachel. She and her mother live with her grandparents in Pilankalai. Ansiga’s father abandoned the family when she was just 52 days old and remarried. Her mother, who is physically handicapped, struggles courageously as a daily wage laborer to care for Ansiga. The extended family also faces severe poverty. Ansiga is a bright, earnest child who needs sponsorship to complete middle and high school.",
      fr: "Ansiga a 12 ans et étudie en 6ème classe au collège public de Moolachel. Elle et sa mère habitent chez ses grands-parents à Pilankalai. Le père d'Ansiga a abandonné la famille alors qu'elle n'avait que 52 jours pour se remarier. Sa mère, atteinte d'un handicap physique, travaille courageusement comme journalière pour élever sa fille. Ansiga est une enfant brillante qui a besoin d'un parrainage pour poursuivre sa scolarité.",
      de: "Ansiga ist 12 Jahre alt und geht in die 6. Klasse der staatlichen Schule in Moolachel. Sie und ihre Mutter leben bei den Großeltern in Pilankalai. Ansigas Vater verließ die Familie, als sie erst 52 Tage alt war, und heiratete erneut. Ihre Mutter, die körperlich beeinträchtigt ist, bestreitet den Lebensunterhalt unter großen Mühen als Tagelöhnerin. Ansiga ist ein fleißiges, aufgewecktes Mädchen, das eine Patenschaft benötigt, um die Schule erfolgreich fortzusetzen."
    },
    image: "/FICFCharity/assets/children/ansiga.png",
  },
];

export const children: Child[] = rawChildren.map((c) => ({
  ...c,
  image: `${import.meta.env.BASE_URL}${c.image.replace(/^\/?(FICFCharity\/)?/, '')}`,
}));
