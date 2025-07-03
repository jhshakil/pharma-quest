import type { QuizQuestion } from "@/types/game";

const quizData: Record<string, QuizQuestion[]> = {
  bangladesh: [
    {
      id: "bd1",
      question:
        "What is the most common cause of diarrheal disease in Bangladesh?",
      options: [
        "Vibrio cholerae",
        "Escherichia coli",
        "Rotavirus",
        "Salmonella typhi",
      ],
      correctAnswer: "Vibrio cholerae",
      explanation:
        "Cholera, caused by Vibrio cholerae, is endemic in Bangladesh due to poor sanitation and contaminated water sources.",
    },
    {
      id: "bd2",
      question:
        "Which antimalarial drug is commonly used in Bangladesh for treating uncomplicated malaria?",
      options: [
        "Chloroquine",
        "Artemether-lumefantrine",
        "Quinine",
        "Doxycycline",
      ],
      correctAnswer: "Artemether-lumefantrine",
      explanation:
        "Artemether-lumefantrine is the first-line treatment for uncomplicated malaria in Bangladesh as recommended by WHO.",
    },
    {
      id: "bd3",
      question:
        "What is the primary treatment for severe acute malnutrition in children in Bangladesh?",
      options: [
        "Ready-to-use therapeutic food (RUTF)",
        "Oral rehydration solution",
        "Vitamin A supplements",
        "Iron tablets",
      ],
      correctAnswer: "Ready-to-use therapeutic food (RUTF)",
      explanation:
        "RUTF is the standard treatment for severe acute malnutrition in children, providing essential nutrients for recovery.",
    },
    {
      id: "bd4",
      question:
        "Which vaccine is part of Bangladesh's routine immunization program to prevent pneumonia?",
      options: [
        "BCG vaccine",
        "Pneumococcal conjugate vaccine (PCV)",
        "Hepatitis B vaccine",
        "Polio vaccine",
      ],
      correctAnswer: "Pneumococcal conjugate vaccine (PCV)",
      explanation:
        "PCV is included in Bangladesh's immunization program to prevent pneumococcal diseases including pneumonia.",
    },
    {
      id: "bd5",
      question:
        "What is the recommended first-line treatment for tuberculosis in Bangladesh?",
      options: [
        "Isoniazid + Rifampin",
        "DOTS (Directly Observed Treatment, Short-course)",
        "Streptomycin + Ethambutol",
        "Fluoroquinolones",
      ],
      correctAnswer: "DOTS (Directly Observed Treatment, Short-course)",
      explanation:
        "DOTS is the WHO-recommended strategy for TB treatment, ensuring patient compliance and reducing drug resistance.",
    },
  ],
  japan: [
    {
      id: "jp1",
      question: "What is Japan's universal health insurance system called?",
      options: [
        "National Health Service",
        "Medicare",
        "Kokumin Kenko Hoken",
        "Shakai Hoken",
      ],
      correctAnswer: "Kokumin Kenko Hoken",
      explanation:
        "Kokumin Kenko Hoken (National Health Insurance) is Japan's universal health coverage system.",
    },
    {
      id: "jp2",
      question:
        "Which traditional Japanese medicine practice is integrated into modern healthcare?",
      options: ["Acupuncture", "Kampo", "Shiatsu", "Reiki"],
      correctAnswer: "Kampo",
      explanation:
        "Kampo, traditional Japanese herbal medicine, is officially recognized and integrated into Japan's healthcare system.",
    },
    {
      id: "jp3",
      question: "What is the leading cause of death in Japan?",
      options: ["Heart disease", "Cancer", "Stroke", "Pneumonia"],
      correctAnswer: "Cancer",
      explanation:
        "Cancer has been the leading cause of death in Japan since 1981, reflecting the aging population.",
    },
    {
      id: "jp4",
      question:
        "Which medication is commonly used in Japan for treating hypertension in elderly patients?",
      options: [
        "ACE inhibitors",
        "Calcium channel blockers",
        "Beta-blockers",
        "Diuretics",
      ],
      correctAnswer: "Calcium channel blockers",
      explanation:
        "Calcium channel blockers are preferred in Japan for elderly hypertensive patients due to their effectiveness and tolerability.",
    },
    {
      id: "jp5",
      question: "What is Japan's approach to antibiotic prescribing called?",
      options: [
        "Antimicrobial stewardship",
        "Judicious use program",
        "Rational antibiotic therapy",
        "Conservative prescribing",
      ],
      correctAnswer: "Antimicrobial stewardship",
      explanation:
        "Japan has implemented antimicrobial stewardship programs to combat antibiotic resistance and promote rational use.",
    },
  ],
  australia: [
    {
      id: "au1",
      question: "What is Australia's national health insurance scheme called?",
      options: ["Medicare", "Medibank", "Health Australia", "Universal Care"],
      correctAnswer: "Medicare",
      explanation:
        "Medicare is Australia's universal health insurance scheme providing access to healthcare services.",
    },
    {
      id: "au2",
      question:
        "Which venomous creature's bite requires specific antivenom treatment in Australia?",
      options: [
        "Redback spider",
        "Blue-ringed octopus",
        "Funnel-web spider",
        "All of the above",
      ],
      correctAnswer: "All of the above",
      explanation:
        "Australia has specific antivenoms for various dangerous creatures including spiders and marine animals.",
    },
    {
      id: "au3",
      question:
        "What is the Pharmaceutical Benefits Scheme (PBS) in Australia?",
      options: [
        "A drug manufacturing program",
        "A medication subsidy program",
        "A pharmacy licensing system",
        "A drug research initiative",
      ],
      correctAnswer: "A medication subsidy program",
      explanation:
        "PBS subsidizes prescription medications for Australian residents, making them more affordable.",
    },
    {
      id: "au4",
      question:
        "Which skin cancer prevention program is prominent in Australia?",
      options: [
        "Slip, Slop, Slap",
        "Sun Smart",
        "Skin Check Australia",
        "UV Protection Plus",
      ],
      correctAnswer: "Slip, Slop, Slap",
      explanation:
        "The 'Slip, Slop, Slap' campaign promotes sun protection to prevent skin cancer in Australia.",
    },
    {
      id: "au5",
      question:
        "What is the first-line treatment for Aboriginal and Torres Strait Islander people with rheumatic heart disease?",
      options: [
        "Penicillin prophylaxis",
        "Aspirin therapy",
        "ACE inhibitors",
        "Warfarin",
      ],
      correctAnswer: "Penicillin prophylaxis",
      explanation:
        "Long-term penicillin prophylaxis is used to prevent recurrent rheumatic fever in Indigenous Australians.",
    },
  ],
  sweden: [
    {
      id: "se1",
      question: "What characterizes Sweden's healthcare system?",
      options: [
        "Private insurance-based",
        "Tax-funded universal healthcare",
        "Mixed public-private system",
        "Fee-for-service model",
      ],
      correctAnswer: "Tax-funded universal healthcare",
      explanation:
        "Sweden has a tax-funded universal healthcare system providing equal access to all residents.",
    },
    {
      id: "se2",
      question:
        "Which approach does Sweden take toward antibiotic prescribing?",
      options: [
        "Liberal prescribing",
        "Restrictive prescribing",
        "Over-the-counter availability",
        "Patient-directed therapy",
      ],
      correctAnswer: "Restrictive prescribing",
      explanation:
        "Sweden has one of the most restrictive antibiotic prescribing policies globally to combat resistance.",
    },
    {
      id: "se3",
      question: "What is Sweden's national drug formulary called?",
      options: ["Läkemedelsverket", "FASS", "Janusinfo", "Kloka Listan"],
      correctAnswer: "Kloka Listan",
      explanation:
        "Kloka Listan (The Wise List) is Stockholm's regional drug formulary promoting rational prescribing.",
    },
    {
      id: "se4",
      question:
        "Which mental health approach is emphasized in Swedish healthcare?",
      options: [
        "Institutional care",
        "Community-based care",
        "Private therapy only",
        "Medication-only treatment",
      ],
      correctAnswer: "Community-based care",
      explanation:
        "Sweden emphasizes community-based mental health care and deinstitutionalization.",
    },
    {
      id: "se5",
      question: "What is Sweden's approach to pharmaceutical pricing?",
      options: [
        "Free market pricing",
        "Government price regulation",
        "Insurance negotiation",
        "Patient co-payment only",
      ],
      correctAnswer: "Government price regulation",
      explanation:
        "Sweden regulates pharmaceutical prices through the Dental and Pharmaceutical Benefits Agency (TLV).",
    },
  ],
  spain: [
    {
      id: "es1",
      question: "What is Spain's national health system called?",
      options: [
        "Sistema Nacional de Salud",
        "Seguridad Social",
        "Sanidad Pública",
        "Servicio de Salud",
      ],
      correctAnswer: "Sistema Nacional de Salud",
      explanation:
        "Sistema Nacional de Salud (SNS) is Spain's universal healthcare system providing free healthcare.",
    },
    {
      id: "es2",
      question:
        "Which medication is commonly prescribed in Spain for cardiovascular disease prevention?",
      options: ["Aspirin", "Statins", "ACE inhibitors", "All of the above"],
      correctAnswer: "All of the above",
      explanation:
        "Spain follows international guidelines using aspirin, statins, and ACE inhibitors for cardiovascular prevention.",
    },
    {
      id: "es3",
      question: "What is the role of pharmacists in Spain's healthcare system?",
      options: [
        "Dispensing only",
        "Clinical consultation and dispensing",
        "Prescription writing",
        "Hospital management",
      ],
      correctAnswer: "Clinical consultation and dispensing",
      explanation:
        "Spanish pharmacists provide clinical consultations and health advice in addition to dispensing medications.",
    },
    {
      id: "es4",
      question:
        "Which infectious disease surveillance system operates in Spain?",
      options: ["RENAVE", "ECDC", "WHO-EURO", "CISNS"],
      correctAnswer: "RENAVE",
      explanation:
        "RENAVE (National Epidemiological Surveillance Network) monitors infectious diseases in Spain.",
    },
    {
      id: "es5",
      question: "What is Spain's approach to generic drug promotion?",
      options: [
        "Brand name preference",
        "Generic substitution encouraged",
        "Patient choice only",
        "No generic policy",
      ],
      correctAnswer: "Generic substitution encouraged",
      explanation:
        "Spain actively promotes generic drug use to reduce healthcare costs while maintaining quality.",
    },
  ],
  england: [
    {
      id: "en1",
      question: "What does NHS stand for in England?",
      options: [
        "National Health Service",
        "National Hospital System",
        "National Healthcare Scheme",
        "National Health Security",
      ],
      correctAnswer: "National Health Service",
      explanation:
        "The National Health Service (NHS) is England's publicly funded healthcare system.",
    },
    {
      id: "en2",
      question: "Which organization regulates medicines in England?",
      options: ["NICE", "MHRA", "NHS England", "Department of Health"],
      correctAnswer: "MHRA",
      explanation:
        "The Medicines and Healthcare products Regulatory Agency (MHRA) regulates medicines and medical devices.",
    },
    {
      id: "en3",
      question: "What is NICE's primary role in English healthcare?",
      options: [
        "Hospital management",
        "Clinical guidelines and technology appraisals",
        "Medical education",
        "Drug manufacturing",
      ],
      correctAnswer: "Clinical guidelines and technology appraisals",
      explanation:
        "NICE provides clinical guidelines and evaluates new treatments for cost-effectiveness.",
    },
    {
      id: "en4",
      question: "Which prescription charge system operates in England?",
      options: [
        "Free prescriptions for all",
        "Fixed charge per prescription",
        "Percentage of drug cost",
        "Income-based charges",
      ],
      correctAnswer: "Fixed charge per prescription",
      explanation:
        "England charges a fixed fee per prescription item, with exemptions for certain groups.",
    },
    {
      id: "en5",
      question: "What is the primary care model in England?",
      options: [
        "Walk-in clinics",
        "GP (General Practitioner) practices",
        "Hospital outpatients",
        "Private clinics",
      ],
      correctAnswer: "GP (General Practitioner) practices",
      explanation:
        "GP practices serve as the foundation of primary care in England's NHS system.",
    },
  ],
};

export const getQuizQuestions = (countryId: string): QuizQuestion[] => {
  return quizData[countryId] || [];
};
